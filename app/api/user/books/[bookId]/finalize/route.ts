import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

type RouteContext = {
    params: Promise<{ bookId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const { bookId } = await context.params;
    const authorization = request.headers.get("authorization") || "";
    const csrf = request.headers.get("x-csrf-token") || "";
    
    if (!authorization) {
        console.warn("⚠️  No Authorization header received at proxy");
    }
    
    const incomingForm = await request.formData();
    const forwardForm = new FormData();

    for (const [key, value] of incomingForm.entries()) {
        if (typeof value === "string") {
            forwardForm.append(key, value);
        } else {
            forwardForm.append(key, value, (value as File).name || "final-book.pdf");
        }
    }

    const backendBaseUrl = BASE_URL.replace(/\/api\/?$/, "");

    const response = await fetch(`${backendBaseUrl}/user/books/${bookId}/finalize`, {
        method: "POST",
        headers: {
            ...(authorization ? { Authorization: authorization } : {}),
            ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
        },
        body: forwardForm,
    });

    const responseText = await response.text();
    let result: unknown;

    if (responseText) {
        try {
            result = JSON.parse(responseText);
        } catch {
            console.warn("⚠️  Backend returned non-JSON (likely HTML - possible auth failure)");
            result = {
                success: response.ok,
                message: responseText.substring(0, 100) + (responseText.length > 100 ? "..." : ""),
                data: null,
                meta: {},
                code: response.status,
            };
        }
    } else {
        result = {
            success: response.ok,
            message: response.ok ? "PDF uploaded successfully" : "PDF upload failed",
            data: null,
            meta: {},
            code: response.status,
        };
    }

    const status = response.status === 204 ? 200 : response.status;

    return NextResponse.json(result, { status });
}

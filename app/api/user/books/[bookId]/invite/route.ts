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
    const bodyText = await request.text();

    const response = await fetch(`${BASE_URL}/user/books/${bookId}/invite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
        },
        body: bodyText || undefined,
    });

    const responseText = await response.text();
    let result: unknown;

    if (responseText) {
        try {
            result = JSON.parse(responseText);
        } catch {
            result = {
                success: response.ok,
                message: responseText,
                data: null,
                meta: {},
                code: response.status,
            };
        }
    } else {
        result = {
            success: response.ok,
            message: response.ok ? "Invitation sent successfully" : "Failed to send invitation",
            data: null,
            meta: {},
            code: response.status,
        };
    }

    const status = response.status === 204 ? 200 : response.status;

    return NextResponse.json(result, { status });
}

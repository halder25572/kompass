import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function POST(request: Request) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const authorization = request.headers.get("authorization") || "";
    const contentType = request.headers.get("content-type") || "";

    const headers: Record<string, string> = {
        Accept: "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
    };

    let body: BodyInit;
    const isFormData = contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded");

    if (isFormData) {
        body = await request.formData();
    } else {
        const payload = await request.json();
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${BASE_URL}/user/payment/stripe/session`, {
            method: "POST",
            headers,
            body,
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            return NextResponse.json(result, { status: response.status });
        } catch {
            return NextResponse.json(
                { success: false, message: `Backend returned invalid response: ${text.slice(0, 200)}`, data: null, meta: {}, code: response.status },
                { status: response.status }
            );
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json(
            { success: false, message, data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }
}

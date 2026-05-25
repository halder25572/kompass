import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const { id } = await context.params;
    const authorization = request.headers.get("authorization") || "";

    const response = await fetch(`${BASE_URL}/user/books/${id}/contributions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
        },
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
            message: response.ok ? "Success" : `Request failed (HTTP ${response.status})`,
            data: null,
            meta: {},
            code: response.status,
        };
    }

    return NextResponse.json(result, { status: response.status });
}
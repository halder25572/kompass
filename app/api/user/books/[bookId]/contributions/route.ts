/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

type RouteContext = {
    params: Promise<{ bookId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing.", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const { bookId } = await context.params;
    const authorization = request.headers.get("authorization") || "";

    console.log("BASE_URL:", BASE_URL);
    console.log("authorization:", authorization);

    const backendUrl = `${BASE_URL}/user/books/${bookId}/contributions`;
    console.log("backendUrl:", backendUrl);

    const response = await fetch(backendUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0",
            ...(authorization ? { Authorization: authorization } : {}),
        },
    });

    const text = await response.text();
    console.log("backend response status:", response.status);
    console.log("backend response text:", text.slice(0, 200));

    try {
        const result = JSON.parse(text);
        return NextResponse.json(result, { status: response.status });
    } catch (err: any) {
        console.error("Failed to parse backend response as JSON:", err?.message, "Response text:", text);
        return NextResponse.json(
            { success: false, message: `Backend returned invalid response: ${text.slice(0, 200)}`, data: null, meta: {}, code: 502 },
            { status: 502 }
        );
    }
}

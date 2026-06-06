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

    const backendUrl = `${BASE_URL}/user/books/${bookId}`;

    try {
        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(authorization ? { Authorization: authorization } : {}),
            },
        });

        const text = await response.text();

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
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error?.message || "Internal server error proxying GET", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }
}

export async function POST(request: Request, context: RouteContext) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing.", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const { bookId } = await context.params;
    const authorization = request.headers.get("authorization") || "";
    const contentType = request.headers.get("content-type") || "";

    const isFormData = contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded");
    const backendUrl = `${BASE_URL}/user/books/${bookId}`;

    const headers: Record<string, string> = {
        "Accept": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
    };

    let body: BodyInit | undefined;
    try {
        if (isFormData) {
            body = await request.formData();
        } else {
            const payload = await request.json();
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(payload);
        }

        const response = await fetch(backendUrl, {
            method: "POST",
            headers,
            body,
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            return NextResponse.json(result, { status: response.status });
        } catch (err: any) {
            console.error("Failed to parse backend response as JSON:", err?.message, "Response text:", text);
            return NextResponse.json(
                { success: false, message: `Backend returned invalid response: ${text.slice(0, 200)}`, data: null, meta: {}, code: response.status },
                { status: response.status }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error?.message || "Internal server error proxying POST", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }
}

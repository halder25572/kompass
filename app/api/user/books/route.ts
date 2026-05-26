import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function GET(request: Request) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: [], meta: {}, code: 500 },
            { status: 500 }
        );
    }

    try {
        const authorization = request.headers.get("authorization") || "";

        const response = await fetch(`${BASE_URL}/user/books`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(authorization ? { Authorization: authorization } : {}),
            },
        });

        const text = await response.text();

        let result: unknown = null;
        if (text.trim()) {
            try {
                result = JSON.parse(text);
            } catch {
                return NextResponse.json(
                    { success: false, message: `Upstream server error (HTTP ${response.status})`, data: [], meta: {}, code: response.status },
                    { status: response.status }
                );
            }
        } else {
            result = {
                success: response.ok,
                message: response.ok ? "Success" : `Request failed (HTTP ${response.status})`,
                data: [],
                meta: {},
                code: response.status,
            };
        }

        return NextResponse.json(result, { status: response.status });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";
        return NextResponse.json(
            { success: false, message, data: [], meta: {}, code: 500 },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    try {
        const authorization = request.headers.get("authorization") || "";
        const contentType = request.headers.get("content-type") || "";

        const isFormData = contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded");

        const headers: Record<string, string> = {
            "Accept": "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
        };

        let body: BodyInit | undefined;
        if (isFormData) {
            body = await request.formData();
        } else {
            const payload = await request.json();
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(payload);
        }

        const response = await fetch(`${BASE_URL}/user/books`, {
            method: "POST",
            headers,
            body,
        });

        const text = await response.text();

        let result: unknown = null;
        if (text.trim()) {
            try {
                result = JSON.parse(text);
            } catch {
                return NextResponse.json(
                    { success: false, message: `Upstream server error (HTTP ${response.status})`, data: null, meta: {}, code: response.status },
                    { status: response.status }
                );
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
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";
        return NextResponse.json(
            { success: false, message, data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }
}
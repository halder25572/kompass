import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function GET(req: NextRequest) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: [], meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const token = req.headers.get("authorization") ?? "";
    try {
        const res = await fetch(`${BASE_URL}/user/book-page-styles`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: token } : {}),
            },
        });
        const text = await res.text();
        try {
            const data = text ? JSON.parse(text) : { success: false, message: "Empty response", data: [], meta: {}, code: res.status };
            return NextResponse.json(data, { status: res.status });
        } catch {
            return NextResponse.json(
                { success: false, message: "Backend returned a non-JSON response", data: [], meta: {}, code: res.status },
                { status: res.status }
            );
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";
        return NextResponse.json(
            { success: false, message, data: [], meta: {}, code: 500 },
            { status: 500 }
        );
    }
}
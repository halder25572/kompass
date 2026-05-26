import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ code: string[] }> }
) {
    if (!BASE_URL) {
        return NextResponse.json(
            { error: "Base URL is not configured" },
            { status: 500 }
        );
    }

    try {
        const { code } = await context.params;
        const inviteCode = Array.isArray(code) ? code.join("/") : code;
        const authHeader = request.headers.get("authorization");

        const response = await fetch(`${BASE_URL}/invite/${inviteCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Invite details proxy error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
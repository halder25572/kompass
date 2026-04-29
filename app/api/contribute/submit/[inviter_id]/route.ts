import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ inviter_id: string }> }
) {
    if (!BASE_URL) {
        return NextResponse.json(
            { error: "Base URL is not configured" },
            { status: 500 }
        );
    }

    try {
        const { inviter_id } = await context.params;
        const authHeader = request.headers.get("authorization");
        const body = await request.json();

        const response = await fetch(`${BASE_URL}/contribute/submit/${inviter_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Contribution submit proxy error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ code: string[] }> }
) {
    if (!BASE_URL) {
        console.error("Check-in proxy error: missing BASE_URL");
        return NextResponse.json(
            { error: "Base URL is not configured" },
            { status: 500 }
        );
    }

    try {
        const code = (await params).code.join("/");

        console.log("Check-in proxy request:", {
            code,
            baseUrl: BASE_URL,
        });

        const res = await fetch(`${BASE_URL}/contribute/check-in/${code}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: await request.text(),
        });

        const text = await res.text();

        console.log("Check-in proxy backend response:", {
            code,
            status: res.status,
            ok: res.ok,
            bodyPreview: text.slice(0, 500),
        });

        return new Response(text, {
            status: res.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Check-in proxy error:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                message: error instanceof Error ? error.message : "Unknown check-in proxy error",
            },
            { status: 500 }
        );
    }
}
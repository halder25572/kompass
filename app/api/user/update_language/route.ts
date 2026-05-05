import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("authorization") ?? "";
        const payload = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL;

        if (!baseUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env",
                    data: { language: "en" },
                    meta: {},
                    code: 500,
                },
                { status: 500 }
            );
        }

        const res = await fetch(`${baseUrl}/user/update_language`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: token } : {}),
            },
            body: JSON.stringify(payload),
        });

        const text = await res.text();

        try {
            const data = text
                ? JSON.parse(text)
                : {
                    success: false,
                    message: "Empty response",
                    data: { language: "en" },
                    meta: {},
                    code: res.status,
                };

            return NextResponse.json(data, { status: res.status });
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: "Backend returned a non-JSON response for language update",
                    data: { language: "en" },
                    meta: {},
                    code: res.status,
                },
                { status: res.status }
            );
        }
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to update language",
                data: { language: "en" },
                meta: {},
                code: 500,
            },
            { status: 500 }
        );
    }
}

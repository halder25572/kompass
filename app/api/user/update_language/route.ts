import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("authorization") ?? "";
        const contentType = req.headers.get("content-type") || "application/json";
        const bodyText = await req.text();
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
                "Content-Type": contentType,
                ...(token ? { Authorization: token } : {}),
            },
            body: bodyText,
        });

        const result = await res.json();
        return NextResponse.json(result, { status: res.status });
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

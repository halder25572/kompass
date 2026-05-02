import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.headers.get("authorization") ?? "";
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/cover-page",
        {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: token } : {}),
            },
        }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
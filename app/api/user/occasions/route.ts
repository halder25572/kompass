import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    const token = req.headers.get("authorization") ?? "";
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user/occasions", {
        method: "GET",
        cache: "no-store",
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
            {
                success: false,
                message: "Backend returned a non-JSON response for occasions",
                data: [],
                meta: {},
                code: res.status,
            },
            { status: res.status }
        );
    }
}
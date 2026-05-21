/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
    if (!BASE_URL) {
        return NextResponse.json(
            { success: false, message: "Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env", data: null, meta: {}, code: 500 },
            { status: 500 }
        );
    }

    const { id } = await context.params;
    const authorization = request.headers.get("authorization") || "";
    const incomingForm = await request.formData();
    const forwardForm = new FormData();

    for (const [key, value] of incomingForm.entries()) {
        if (typeof value === "string") {
            forwardForm.append(key, value);
        } else {
            forwardForm.append(key, value, value.name || "final-book.pdf");
        }
    }

    const response = await fetch(`${BASE_URL}/user/books/${id}/finalize`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
        },
        body: forwardForm,
    });

    const responseText = await response.text();
    let result: unknown;

    if (responseText) {
        try {
            result = JSON.parse(responseText);
        } catch {
            // If backend sends HTML (e.g., login page), just indicate failure without hardcoded message
            const looksLikeHtml = /<\!doctype html>|<html[\s>]/i.test(responseText);
            result = {
                success: false,
                message: "", // Let backend message come through, empty if none provided
                data: null,
                meta: {},
                code: response.status,
            };
        }
    } else {
        // Empty response - backend decides what to send, don't add our own message
        result = {
            success: response.ok,
            message: "", // Empty - no hardcoded message
            data: null,
            meta: {},
            code: response.status,
        };
    }

    const status = response.status === 204 ? 200 : response.status;

    return NextResponse.json(result, { status });
}
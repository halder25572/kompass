import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing url query parameter", { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return new Response("Unsupported url protocol", { status: 400 });
  }

  const upstream = await fetch(parsedUrl.toString(), {
    headers: {
      Accept: "image/*",
    },
  });

  if (!upstream.ok) {
    return new Response(`Upstream image request failed with ${upstream.status}`, {
      status: upstream.status,
    });
  }

  const buffer = await upstream.arrayBuffer();
  const contentType = upstream.headers.get("content-type") || "image/jpeg";

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
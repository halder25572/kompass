export async function POST(req: Request) {
	try {
		const authHeader = req.headers.get("authorization");
		const body = await req.json();

		const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/coupons/apply`;

		const response = await fetch(backendUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(authHeader ? { Authorization: authHeader } : {}),
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		return Response.json(data, {
			status: response.status,
			headers: {
				"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
			},
		});
	} catch (error) {
		console.error("Coupon apply error:", error);
		return Response.json(
			{
				success: false,
				message: "Failed to apply coupon",
				data: {},
				meta: {},
				code: 500,
			},
			{ status: 500 }
		);
	}
}

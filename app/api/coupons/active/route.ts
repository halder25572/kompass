export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
	try {
		const authHeader = req.headers.get("authorization");

		const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/coupons/active`;

		const response = await fetch(backendUrl, {
			method: "GET",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
				...(authHeader ? { Authorization: authHeader } : {}),
			},
		});

		const data = await response.json();

		return Response.json(data, {
			status: response.status,
			headers: {
				"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
			},
		});
	} catch (error) {
		console.error("Coupons fetch error:", error);
		return Response.json(
			{
				success: false,
				message: "Failed to fetch active coupons",
				data: [],
				meta: {},
				code: 500,
			},
			{ status: 500 }
		);
	}
}

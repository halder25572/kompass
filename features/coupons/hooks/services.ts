import { useQuery } from "@tanstack/react-query";
import { fetchActiveCoupons } from "../api";
import type { CouponsResponse } from "@/types/api";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "@/services/api";
import type { ApplyCouponPayload, AppliedCouponResponse } from "@/types/api";

function getAuthToken() {
	if (typeof window === "undefined") {
		return "";
	}

	return localStorage.getItem("token") || "";
}

export function useActiveCouponsQuery() {
	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		const syncToken = () => setAuthToken(getAuthToken());

		syncToken();
		window.addEventListener("auth-token-updated", syncToken);
		window.addEventListener("storage", syncToken);

		return () => {
			window.removeEventListener("auth-token-updated", syncToken);
			window.removeEventListener("storage", syncToken);
		};
	}, []);

	return useQuery<CouponsResponse, Error>({
		queryKey: ["coupons", "active", authToken || "anonymous"],
		enabled: !!authToken,
		queryFn: () => fetchActiveCoupons(authToken),
		retry: false,
	});
}

export function useApplyCouponMutation() {
	return useMutation<AppliedCouponResponse, Error, ApplyCouponPayload>({
		mutationFn: applyCoupon,
	});
}

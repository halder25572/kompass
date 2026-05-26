import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBookUser,
	fetchBooks,
	fetchBookDetails,
	fetchBookContributions,
	fetchContribution,
	updateBookUser,
	BooksResponse,
	BookDetailResponse,
	CreateBookPayload,
	CreateBookResponse,
	SendBookInviteResponse,
	UpdateBookPayload,
	UpdateBookResponse,
	inviteByEmail,
} from "@/services/api";
import type { Contribution, ContributionsListResponse, ContributionDetailResponse } from "@/types/api";
import { useSession } from "next-auth/react";

const EMPTY_CONTRIBUTIONS: Contribution[] = [];

export function useBooksQuery() {
	return useQuery<BooksResponse, Error>({
		queryKey: ["books"],
		queryFn: fetchBooks,
		retry: false,
	});
}

export function useBookDetailsQuery(bookId: string | number | undefined) {
	return useQuery<BookDetailResponse, Error>({
		queryKey: ["book", bookId],
		queryFn: () => fetchBookDetails(bookId as string | number),
		enabled: Boolean(bookId),
		retry: false,
	});	
}

export function useCreateBookMutation() {
	const queryClient = useQueryClient();

	return useMutation<CreateBookResponse, Error, CreateBookPayload>({
		mutationFn: createBookUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});
}

export function useUpdateBookMutation(bookId: string | number | undefined) {
	const queryClient = useQueryClient();

	return useMutation<UpdateBookResponse, Error, UpdateBookPayload>({
		mutationFn: (payload) => updateBookUser(bookId as string | number, payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["books"] });
			await queryClient.invalidateQueries({ queryKey: ["book", bookId] });
		},
	});
}

export function useSendBookInviteMutation(bookId: string | number | undefined) {
    const queryClient = useQueryClient();

    return useMutation<SendBookInviteResponse, Error, string>({
        mutationFn: (email: string) => inviteByEmail(bookId as string | number, email),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["books"] });
            await queryClient.invalidateQueries({ queryKey: ["book", bookId] });
        },
    });
}

export type BookContributionsSummary = {
	bookId: number;
	statistics: {
		total: number;
		invited: number;
		submitted: number;
		pending: number;
		progress: string;
	} | null;
	contributions: Contribution[];
};

function toFiniteNumber(value: unknown, fallback = 0): number {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function formatProgress(submitted: number, invited: number, fallback?: unknown): string {
	if (typeof fallback === "string" && fallback.trim()) {
		return fallback;
	}

	if (invited <= 0) {
		return "0%";
	}

	const percent = Math.round((submitted / invited) * 100);
	return `${Math.max(0, Math.min(percent, 100))}%`;
}

function pickContributionList(payload: Record<string, unknown>): Contribution[] {
	const candidates = [
		payload.contributions,
		payload.participants,
		payload.items,
		(payload as { contribution_list?: unknown }).contribution_list,
		(payload as { contribution_items?: unknown }).contribution_items,
	];

	for (const candidate of candidates) {
		if (Array.isArray(candidate)) {
			return candidate as Contribution[];
		}
	}

	return [];
}

function normalizeStatistics(payload: Record<string, unknown>, contributions: Contribution[]) {
	const stats =
		payload.statistics && typeof payload.statistics === "object" && !Array.isArray(payload.statistics)
			? (payload.statistics as Record<string, unknown>)
			: payload.stats && typeof payload.stats === "object" && !Array.isArray(payload.stats)
				? (payload.stats as Record<string, unknown>)
				: {};

	const submitted = toFiniteNumber(stats.submitted, 0);
	const pending = toFiniteNumber(stats.pending, 0);
	const invitedFromApi = toFiniteNumber(stats.total_invited, toFiniteNumber(stats.invited, 0));
	const invited = invitedFromApi > 0 ? invitedFromApi : contributions.length;
	const total = toFiniteNumber(stats.total, invited);

	return {
		total,
		invited,
		submitted,
		pending,
		progress: formatProgress(submitted, invited, stats.progress),
	};
}

function normalizeContributionsSummary(
	response: ContributionsListResponse,
	bookId: string | number | undefined
): BookContributionsSummary {
	const payload = response.data;
	const nestedPayload =
		payload && typeof payload === "object" && "data" in payload
			? (payload as { data?: unknown }).data
			: payload;

	const candidate =
		nestedPayload && typeof nestedPayload === "object" && !Array.isArray(nestedPayload)
			? (nestedPayload as Record<string, unknown>)
			: {};

	const rootCandidate =
		payload && typeof payload === "object" && !Array.isArray(payload)
			? (payload as Record<string, unknown>)
			: {};

	const candidateContributions = pickContributionList(candidate);
	const rootContributions = pickContributionList(rootCandidate);
	const contributions = candidateContributions.length > 0 ? candidateContributions : rootContributions;
	const statistics = normalizeStatistics(candidate, contributions);

	const resolvedBookId =
		typeof candidate.book_id === "number"
			? candidate.book_id
			: typeof rootCandidate.book_id === "number"
				? rootCandidate.book_id
				: Number(bookId);

	return {
		bookId: Number.isFinite(resolvedBookId) ? resolvedBookId : Number(bookId),
		statistics,
		contributions,
	};
}

export function useBookContributionsQuery(bookId: string | number | undefined) {
	const { data: session } = useSession();
	const sessionToken = (session as { accessToken?: string } | null | undefined)?.accessToken ?? null;
	const query = useQuery<ContributionsListResponse, Error, BookContributionsSummary>({
		queryKey: ["contributions", bookId],
		queryFn: () => fetchBookContributions(bookId as string | number, sessionToken),
		enabled: Boolean(bookId),
		retry: false,
		select: (response) => normalizeContributionsSummary(response, bookId),
	});

	const contributions = query.data?.contributions ?? EMPTY_CONTRIBUTIONS;

	// Log contributions shape for debugging inconsistent API responses
	try {
		console.log("useBookContributionsQuery contributions:", contributions, "length:", contributions.length);
	} catch {}

	return {
		...query,
		contributions,
		statistics: query.data?.statistics ?? null,
	};
}

export function useContributionQuery(contributionId: string | number | undefined) {
	return useQuery<ContributionDetailResponse, Error>({
		queryKey: ["contribution", contributionId],
		queryFn: () => fetchContribution(contributionId as string | number),
		enabled: Boolean(contributionId),
		retry: false,
	});
}
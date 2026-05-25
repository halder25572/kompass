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
	statistics: NonNullable<ContributionsListResponse["data"]>["statistics"] | null;
	contributions: Contribution[];
};

export function useBookContributionsQuery(bookId: string | number | undefined) {
	const query = useQuery<ContributionsListResponse, Error, BookContributionsSummary>({
		queryKey: ["contributions", bookId],
		queryFn: () => fetchBookContributions(bookId as string | number),
		enabled: Boolean(bookId),
		retry: false,
		select: (response) => ({
			bookId: response.data?.book_id ?? Number(bookId),
			statistics: response.data?.statistics ?? null,
			contributions: response.data?.contributions ?? [],
		}),
	});

	const contributions = query.data?.contributions ?? EMPTY_CONTRIBUTIONS;

	// Log contributions shape for debugging inconsistent API responses
	try {
		console.log("useBookContributionsQuery contributions:", contributions);
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
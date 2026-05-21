import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createBookUser,
	fetchBooks,
	fetchBookDetails,
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
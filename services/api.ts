// export interface RegisterPayload {
//     name: string;
//     email: string;
//     password: string;
// }

// export interface LoginPayload {
//     email: string;
//     password: string;
// }

// export interface GoogleLoginPayload {
//     token: string;
// }

// export interface ForgotPasswordPayload {
//     email: string;
// }

// export interface VerifyOtpPayload {
//     email: string;
//     otp: string;
// }

// export interface ResendOtpPayload {
//     email: string;
// }

// export interface ResetPasswordPayload {
//     email: string;
//     password: string;
//     password_confirmation: string;
// }

// export interface ChangePasswordPayload {
//     current_password: string;
//     password: string;
//     password_confirmation: string;
//     new_password?: string;
//     new_password_confirmation?: string;
// }

// type ApiErrorShape = {
//     message?: string;
//     errors?: Record<string, string[] | string>;
// };

// function getApiErrorMessage(result: unknown, fallback: string): string {
//     const parsed = result as ApiErrorShape | null;

//     if (parsed?.errors && typeof parsed.errors === "object") {
//         const messages = Object.values(parsed.errors)
//             .flatMap((value) => (Array.isArray(value) ? value : [value]))
//             .filter((value): value is string => typeof value === "string" && value.trim().length > 0);

//         if (messages.length > 0) {
//             return messages.join("\n");
//         }
//     }

//     if (parsed?.message && parsed.message.trim().length > 0) {
//         return parsed.message;
//     }

//     return fallback;
// }

// export interface UpdateProfilePayload {
//     name: string;
//     email: string;
//     phone?: string;
// }

// interface RegisterUser {
//     id: number;
//     avatar: string;
//     name: string;
//     email: string;
//     phone: string | null;
// }

// export interface UserProfile {
//     id: number;
//     avatar: string;
//     name: string;
//     email: string;
//     phone: string | null;
// }

// export interface LoginResponse {
//     success: boolean;
//     message: string;
//     data: {
//         access_token: string;
//         token_type: string;
//         user: RegisterUser;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface GoogleLoginResponse {
//     success: boolean;
//     message: string;
//     data: {
//         access_token?: string;
//         token?: string;
//         token_type?: string;
//         user: RegisterUser;
//     };
//     meta?: Record<string, unknown>;
//     code: number;
// }

// export interface RegisterResponse {
//     success: boolean;
//     message: string;
//     data: {
//         user: RegisterUser;
//         role: string;
//         token: string;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface ForgotPasswordResponse {
//     success: boolean;
//     message: string;
//     data: [];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface VerifyOtpResponse {
//     success: boolean;
//     message: string;
//     data: [];
//     meta?: Record<string, unknown>;
//     code: number;
// }

// export interface ResendOtpResponse {
//     success: boolean;
//     message: string;
//     data: [];
//     meta?: Record<string, unknown>;
//     code: number;
// }

// export interface ResetPasswordResponse {
//     success: boolean;
//     message: string;
//     data: [];
//     meta?: Record<string, unknown>;
//     code: number;
// }

// export interface ChangePasswordResponse {
//     success: boolean;
//     message: string;
//     data: [];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface ShowUserResponse {
//     success: boolean;
//     message: string;
//     data: {
//         user: UserProfile;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface UpdateProfileResponse {
//     success: boolean;
//     message: string;
//     data: {
//         user: UserProfile;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface OccasionSubOccasion {
//     id: number;
//     occasion_id: number;
//     name: string;
//     image: string;
//     status: number;
// }

// export interface Occasion {
//     id: number;
//     name: string;
//     image: string;
//     status: number;
//     sub_occasions: OccasionSubOccasion[];
// }

// export interface OccasionsResponse {
//     success: boolean;
//     message: string;
//     data: Occasion[];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface BookPageStyle {
//     id: number;
//     occasion_id: number;
//     occasion_name: string;
//     sub_occasion_id: number;
//     sub_occasion_name: string;
//     name: string;
//     description: string;
//     image: string[];
//     status: number;
// }

// export interface BookPageStylesResponse {
//     success: boolean;
//     message: string;
//     data: BookPageStyle[];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface CoverPageStyle {
//     id: number;
//     occasion_id: number;
//     occasion_name: string;
//     sub_occasion_id: number;
//     sub_occasion_name: string;
//     name: string;
//     description: string;
//     image: string[];
//     status: number;
// }

// export interface CoverPageStylesResponse {
//     success: boolean;
//     message: string;
//     data: CoverPageStyle[];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface BookItem {
//     id: number;
//     book_title?: string;
//     book_subtitle?: string;
//     recipient_name?: string | null;
//     occasion?: string | null;
//     sub_occasion?: string | null;
//     invite_link?: string | null;
//     expire_date?: string | null;
//     title?: string;
//     name?: string;
//     pages?: number;
//     page_count?: number;
//     dueDate?: string;
//     due_date?: string;
//     updated_at?: string;
//     progress?: number;
//     status?: string;
//     [key: string]: unknown;
// }

// export interface BooksResponse {
//     success: boolean;
//     message: string;
//     data: BookItem[];
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface CreateBookPayload {
//     book_title: string;
//     book_subtitle: string;
//     recipient_name: string;
//     occasion: string | null;
//     sub_occasion: string | null;
// }

// export interface CreateBookResponse {
//     success: boolean;
//     message: string;
//     data: {
//         id: number;
//         book_title: string;
//         book_subtitle: string;
//         recipient_name: string;
//         occasion: string | null;
//         sub_occasion: string | null;
//         invite_link: string;
//         expire_date: string;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface UpdateBookPayload {
//     book_title: string;
//     book_subtitle: string | null;
//     recipient_name: string;
//     occasion: string | null;
//     sub_occasion: string | null;
//     questions?: string[] | null;
// }

// export interface UpdateBookResponse {
//     success: boolean;
//     message: string;
//     data: {
//         id: number;
//         book_title: string;
//         book_subtitle: string | null;
//         recipient_name: string;
//         occasion: string | null;
//         sub_occasion: string | null;
//         questions: string[] | null;
//         invite_link: string;
//         expire_date: string;
//         final_pdf_path: string | null;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface SendBookInviteResponse {
//     success: boolean;
//     message: string;
//     data: {
//         book_id: number;
//         invite_link_id: number;
//         name: string;
//         email: string;
//         status: number;
//         updated_at: string;
//         created_at: string;
//         id: number;
//         full_image_urls: string[];
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface BookDetailStatistics {
//     total_invited: number;
//     submitted: number;
//     pending: number;
// }

// export interface BookDetails {
//     id: number;
//     book_title: string;
//     book_subtitle: string;
//     recipient_name: string;
//     occasion: string | null;
//     sub_occasion: string | null;
//     cover_style: string | null;
//     page_style: string | null;
//     questions: string[];
//     invite_link: string;
//     expire_date: string;
//     final_pdf_path: string | null;
// }

// export interface BookDetailResponse {
//     success: boolean;
//     message: string;
//     data: {
//         book_details: BookDetails;
//         statistics: BookDetailStatistics;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface CheckInResponse {
//     success: boolean;
//     message: string;
//     data: {
//         inviter_id: string;
//         status: string;
//         is_already_submitted: boolean;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface GetInviteResponse {
//     success: boolean;
//     message: string;
//     data: {
//         book_id: number;
//         invite_link_id: number;
//         book_title: string;
//         recipient_name: string;
//         questions: string[];
//         occasion: string | null;
//         expire_date: string;
//         is_expired: boolean;
//         participant_status: string | null;
//         is_already_submitted: boolean;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// export interface SubmitContributionPayload {
//     name: string;
//     email: string;
//     answers: string[];
//     images?: string[];
// }

// export interface SubmitContributionResponse {
//     success: boolean;
//     message: string;
//     data: {
//         id: number;
//         name: string;
//         email: string;
//         answers: string[];
//         images: string[];
//         status: string;
//     };
//     meta: Record<string, unknown>;
//     code: number;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

// function getAuthToken() {
//     if (typeof window === "undefined") {
//         return "";
//     }

//     return localStorage.getItem("token") || "";
// }

// // for register api
// export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as RegisterResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Registration failed");
//     }

//     return result;
// }

// // for login api
// export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as LoginResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Login failed");
//     }

//     return result;
// }

// export async function googleLoginUser(
//     payload: GoogleLoginPayload
// ): Promise<GoogleLoginResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const postResponse = await fetch(`${BASE_URL}/user/login/google`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const postResult = (await postResponse.json()) as GoogleLoginResponse;

//     if (postResponse.ok && postResult.success) {
//         return postResult;
//     }

//     const queryToken = encodeURIComponent(payload.token);
//     const getResponse = await fetch(`${BASE_URL}/user/login/google?token=${queryToken}`, {
//         method: "GET",
//     });

//     const getResult = (await getResponse.json()) as GoogleLoginResponse;

//     if (!getResponse.ok || !getResult.success) {
//         throw new Error(getResult?.message || postResult?.message || "Google login failed");
//     }

//     return getResult;
// }

// // for forgot password api
// export async function forgotPasswordUser(
//     payload: ForgotPasswordPayload
// ): Promise<ForgotPasswordResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/forget_password`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as ForgotPasswordResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to send OTP");
//     }

//     return result;
// }

// // for verify otp api
// export async function verifyOtpUser(
//     payload: VerifyOtpPayload
// ): Promise<VerifyOtpResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/verify_otp`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as VerifyOtpResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Invalid OTP");
//     }

//     return result;
// }

// // for resend otp api
// export async function resendOtpUser(
//     payload: ResendOtpPayload
// ): Promise<ResendOtpResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/resend_otp`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as ResendOtpResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to resend OTP");
//     }

//     return result;
// }

// // for reset password api
// export async function resetPasswordUser(
//     payload: ResetPasswordPayload
// ): Promise<ResetPasswordResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/reset_password`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as ResetPasswordResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to reset password");
//     }

//     return result;
// }

// // for change password api
// export async function changePasswordUser(
//     payload: ChangePasswordPayload
// ): Promise<ChangePasswordResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Authentication token is missing.");
//     }

//     const response = await fetch(`${BASE_URL}/user/change_password`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as ChangePasswordResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(getApiErrorMessage(result, "Failed to change password"));
//     }

//     return result;
// }

// // for show user profile api
// export async function showUser(): Promise<ShowUserResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Authentication token is missing.");
//     }

//     const response = await fetch(`${BASE_URL}/user/show`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const result = (await response.json()) as ShowUserResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load user profile");
//     }

//     return result;
// }

// // for update user profile api
// export async function updateProfileUser(
//     payload: UpdateProfilePayload
// ): Promise<UpdateProfileResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Authentication token is missing.");
//     }

//     const response = await fetch(`${BASE_URL}/user/update`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as UpdateProfileResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to update profile");
//     }

//     return result;
// }

// export async function fetchOccasions(): Promise<OccasionsResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/occasions`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const result = (await response.json()) as OccasionsResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load occasions");
//     }

//     return result;
// }

// export async function fetchBookPageStyles(): Promise<BookPageStylesResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/book-page-styles`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const result = (await response.json()) as BookPageStylesResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load book page styles");
//     }

//     return result;
// }

// export async function fetchCoverPageStyles(): Promise<CoverPageStylesResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/cover-page`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const result = (await response.json()) as CoverPageStylesResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load cover page styles");
//     }

//     return result;
// }

// export async function fetchBooks(): Promise<BooksResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`${BASE_URL}/user/books`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     const result = (await response.json()) as BooksResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load books");
//     }

//     return result;
// }

// export async function createBookUser(payload: CreateBookPayload): Promise<CreateBookResponse> {
//     const token = getAuthToken();
//     const response = await fetch(`/api/user/books`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as CreateBookResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to create book");
//     }

//     return result;
// }

// export async function updateBookUser(
//     bookId: string | number,
//     payload: UpdateBookPayload
// ): Promise<UpdateBookResponse> {
//     if (!bookId && bookId !== 0) {
//         throw new Error("Book ID is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`/api/user/books/${bookId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as UpdateBookResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to update book");
//     }

//     return result;
// }

// export async function sendBookInviteUser(bookId: string | number): Promise<SendBookInviteResponse> {
//     if (!bookId && bookId !== 0) {
//         throw new Error("Book ID is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`/api/user/books/${bookId}/invite`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const responseText = await response.text();
//     let result: SendBookInviteResponse;

//     if (responseText) {
//         try {
//             result = JSON.parse(responseText) as SendBookInviteResponse;
//         } catch {
//             result = {
//                 success: response.ok,
//                 message: response.ok ? responseText : "Failed to send invitation",
//                 data: {
//                     book_id: Number(bookId),
//                     invite_link_id: 0,
//                     name: "",
//                     email: "",
//                     status: 0,
//                     updated_at: "",
//                     created_at: "",
//                     id: 0,
//                     full_image_urls: [],
//                 },
//                 meta: {},
//                 code: response.status,
//             };
//         }
//     } else {
//         result = {
//             success: response.ok,
//             message: response.ok ? "Invitation sent successfully" : "Failed to send invitation",
//             data: {
//                 book_id: Number(bookId),
//                 invite_link_id: 0,
//                 name: "",
//                 email: "",
//                 status: 0,
//                 updated_at: "",
//                 created_at: "",
//                 id: 0,
//                 full_image_urls: [],
//             },
//             meta: {},
//             code: response.status,
//         };
//     }

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to send invitation");
//     }

//     return result;
// }

// export async function fetchBookDetails(bookId: string | number): Promise<BookDetailResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     if (!bookId && bookId !== 0) {
//         throw new Error("Book ID is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`${BASE_URL}/user/books/${bookId}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const result = (await response.json()) as BookDetailResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load book details");
//     }

//     return result;
// }

// export async function checkInContributor(code: string): Promise<CheckInResponse> {
//     if (!code) {
//         throw new Error("Check-in code is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`/api/contribute/check-in/${code}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const result = (await response.json()) as CheckInResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Check-in failed");
//     }

//     return result;
// }

// export async function fetchInviteDetails(code: string): Promise<GetInviteResponse> {
//     if (!code) {
//         throw new Error("Invite code is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`/api/invite/${code}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const result = (await response.json()) as GetInviteResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load invite details");
//     }

//     return result;
// }

// export async function submitContribution(
//     inviterId: string | number,
//     payload: SubmitContributionPayload
// ): Promise<SubmitContributionResponse> {
//     if (!inviterId && inviterId !== 0) {
//         throw new Error("Inviter ID is required.");
//     }

//     const token = getAuthToken();
//     const response = await fetch(`/api/contribute/submit/${inviterId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//     });

//     const result = (await response.json()) as SubmitContributionResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to submit contribution");
//     }

//     return result;
// }



export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface GoogleLoginPayload {
    token: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface VerifyOtpPayload {
    email: string;
    otp: string;
}

export interface ResendOtpPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ChangePasswordPayload {
    current_password: string;
    password: string;
    password_confirmation: string;
    new_password?: string;
    new_password_confirmation?: string;
}

type ApiErrorShape = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

function getApiErrorMessage(result: unknown, fallback: string): string {
    const parsed = result as ApiErrorShape | null;

    if (parsed?.errors && typeof parsed.errors === "object") {
        const messages = Object.values(parsed.errors)
            .flatMap((value) => (Array.isArray(value) ? value : [value]))
            .filter((value): value is string => typeof value === "string" && value.trim().length > 0);

        if (messages.length > 0) {
            return messages.join("\n");
        }
    }

    if (parsed?.message && parsed.message.trim().length > 0) {
        return parsed.message;
    }

    return fallback;
}

export interface UpdateProfilePayload {
    name: string;
    email: string;
    phone?: string;
}

interface RegisterUser {
    id: number;
    avatar: string;
    name: string;
    email: string;
    phone: string | null;
}

export interface UserProfile {
    id: number;
    avatar: string;
    name: string;
    email: string;
    phone: string | null;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        token_type: string;
        user: RegisterUser;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface GoogleLoginResponse {
    success: boolean;
    message: string;
    data: {
        access_token?: string;
        token?: string;
        token_type?: string;
        user: RegisterUser;
    };
    meta?: Record<string, unknown>;
    code: number;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: RegisterUser;
        role: string;
        token: string;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    data: [];
    meta: Record<string, unknown>;
    code: number;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string;
    data: [];
    meta?: Record<string, unknown>;
    code: number;
}

export interface ResendOtpResponse {
    success: boolean;
    message: string;
    data: [];
    meta?: Record<string, unknown>;
    code: number;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
    data: [];
    meta?: Record<string, unknown>;
    code: number;
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
    data: [];
    meta: Record<string, unknown>;
    code: number;
}

export interface ShowUserResponse {
    success: boolean;
    message: string;
    data: {
        user: UserProfile;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data: {
        user: UserProfile;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface OccasionSubOccasion {
    id: number;
    occasion_id: number;
    name: string;
    image: string;
    status: number;
}

export interface Occasion {
    id: number;
    name: string;
    image: string;
    status: number;
    sub_occasions: OccasionSubOccasion[];
}

export interface OccasionsResponse {
    success: boolean;
    message: string;
    data: Occasion[];
    meta: Record<string, unknown>;
    code: number;
}

export interface BookPageStyle {
    id: number;
    occasion_id: number;
    occasion_name: string;
    sub_occasion_id: number;
    sub_occasion_name: string;
    name: string;
    description: string;
    image: string[];
    status: number;
}

export interface BookPageStylesResponse {
    success: boolean;
    message: string;
    data: BookPageStyle[];
    meta: Record<string, unknown>;
    code: number;
}

export interface CoverPageStyle {
    id: number;
    occasion_id: number;
    occasion_name: string;
    sub_occasion_id: number;
    sub_occasion_name: string;
    name: string;
    description: string;
    image: string[];
    status: number;
}

export interface CoverPageStylesResponse {
    success: boolean;
    message: string;
    data: CoverPageStyle[];
    meta: Record<string, unknown>;
    code: number;
}

export interface BookItem {
    id: number;
    book_title?: string;
    book_subtitle?: string;
    recipient_name?: string | null;
    occasion?: string | null;
    sub_occasion?: string | null;
    invite_link?: string | null;
    expire_date?: string | null;
    title?: string;
    name?: string;
    pages?: number;
    page_count?: number;
    dueDate?: string;
    due_date?: string;
    updated_at?: string;
    progress?: number;
    status?: string;
    [key: string]: unknown;
}

export interface BooksResponse {
    success: boolean;
    message: string;
    data: BookItem[];
    meta: Record<string, unknown>;
    code: number;
}

export interface CreateBookPayload {
    book_title: string;
    book_subtitle: string;
    recipient_name: string;
    occasion: string | null;
    sub_occasion: string | null;
}

export interface CreateBookResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        book_title: string;
        book_subtitle: string;
        recipient_name: string;
        occasion: string | null;
        sub_occasion: string | null;
        invite_link: string;
        expire_date: string;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface UpdateBookPayload {
    book_title: string;
    book_subtitle: string | null;
    recipient_name: string;
    occasion: string | null;
    sub_occasion: string | null;
    questions?: string[] | null;
}

export interface UpdateBookResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        book_title: string;
        book_subtitle: string | null;
        recipient_name: string;
        occasion: string | null;
        sub_occasion: string | null;
        questions: string[] | null;
        invite_link: string;
        expire_date: string;
        final_pdf_path: string | null;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface SendBookInviteResponse {
    success: boolean;
    message: string;
    data: {
        book_id: number;
        invite_link_id: number;
        name: string;
        email: string;
        status: number;
        updated_at: string;
        created_at: string;
        id: number;
        full_image_urls: string[];
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface BookDetailStatistics {
    total_invited: number;
    submitted: number;
    pending: number;
}

export interface BookDetails {
    id: number;
    book_title: string;
    book_subtitle: string;
    recipient_name: string;
    occasion: string | null;
    sub_occasion: string | null;
    cover_style: string | null;
    page_style: string | null;
    questions: string[];
    invite_link: string;
    expire_date: string;
    final_pdf_path: string | null;
}

export interface BookDetailResponse {
    success: boolean;
    message: string;
    data: {
        book_details: BookDetails;
        statistics: BookDetailStatistics;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface CheckInResponse {
    success: boolean;
    message: string;
    data: {
        inviter_id: string;
        status: string;
        is_already_submitted: boolean;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface GetInviteResponse {
    success: boolean;
    message: string;
    data: {
        book_id: number;
        invite_link_id: number;
        book_title: string;
        recipient_name: string;
        questions: string[];
        occasion: string | null;
        expire_date: string;
        is_expired: boolean;
        participant_status: string | null;
        is_already_submitted: boolean;
    };
    meta: Record<string, unknown>;
    code: number;
}

export interface SubmitContributionPayload {
    name: string;
    email: string;
    answers: string[];
    images?: string[];
}

export interface SubmitContributionResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        answers: string[];
        images: string[];
        status: string;
    };
    meta: Record<string, unknown>;
    code: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

function getAuthToken() {
    if (typeof window === "undefined") {
        return "";
    }

    return localStorage.getItem("token") || "";
}

// ── Safe JSON parser (handles empty body & non-JSON responses) ───────────────
async function safeParseJson<T>(response: Response): Promise<T | null> {
    const text = await response.text();
    if (!text.trim()) return null;
    try {
        return JSON.parse(text) as T;
    } catch {
        throw new Error(
            `Server returned an unexpected response (HTTP ${response.status}). ` +
            `Please try again or contact support.`
        );
    }
}

// for register api
export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as RegisterResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Registration failed");
    }

    return result;
}

// for login api
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as LoginResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Login failed");
    }

    return result;
}

export async function googleLoginUser(
    payload: GoogleLoginPayload
): Promise<GoogleLoginResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const postResponse = await fetch(`${BASE_URL}/user/login/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const postResult = (await postResponse.json()) as GoogleLoginResponse;

    if (postResponse.ok && postResult.success) {
        return postResult;
    }

    const queryToken = encodeURIComponent(payload.token);
    const getResponse = await fetch(`${BASE_URL}/user/login/google?token=${queryToken}`, {
        method: "GET",
    });

    const getResult = (await getResponse.json()) as GoogleLoginResponse;

    if (!getResponse.ok || !getResult.success) {
        throw new Error(getResult?.message || postResult?.message || "Google login failed");
    }

    return getResult;
}

// for forgot password api
export async function forgotPasswordUser(
    payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/forget_password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ForgotPasswordResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to send OTP");
    }

    return result;
}

// for verify otp api
export async function verifyOtpUser(
    payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/verify_otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as VerifyOtpResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Invalid OTP");
    }

    return result;
}

// for resend otp api
export async function resendOtpUser(
    payload: ResendOtpPayload
): Promise<ResendOtpResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/resend_otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ResendOtpResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to resend OTP");
    }

    return result;
}

// for reset password api
export async function resetPasswordUser(
    payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/reset_password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ResetPasswordResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to reset password");
    }

    return result;
}

// for change password api
export async function changePasswordUser(
    payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing.");
    }

    const response = await fetch(`${BASE_URL}/user/change_password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ChangePasswordResponse;

    if (!response.ok || !result.success) {
        throw new Error(getApiErrorMessage(result, "Failed to change password"));
    }

    return result;
}

// for show user profile api
export async function showUser(): Promise<ShowUserResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing.");
    }

    const response = await fetch(`${BASE_URL}/user/show`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const result = (await response.json()) as ShowUserResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load user profile");
    }

    return result;
}

// for update user profile api
export async function updateProfileUser(
    payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing.");
    }

    const response = await fetch(`${BASE_URL}/user/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as UpdateProfileResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to update profile");
    }

    return result;
}

export async function fetchOccasions(): Promise<OccasionsResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/occasions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as OccasionsResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load occasions");
    }

    return result;
}

export async function fetchBookPageStyles(): Promise<BookPageStylesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/book-page-styles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as BookPageStylesResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load book page styles");
    }

    return result;
}

export async function fetchCoverPageStyles(): Promise<CoverPageStylesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/user/cover-page`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as CoverPageStylesResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load cover page styles");
    }

    return result;
}

export async function fetchBooks(): Promise<BooksResponse> {
    const token = getAuthToken();

    const response = await fetch(`/api/user/books`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = await safeParseJson<BooksResponse>(response);

    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || `Server error (HTTP ${response.status}).`) : `Server error (HTTP ${response.status}).`
        );
    }

    if (!result) {
        // treat empty as empty list
        return { success: true, message: "", data: [], meta: {}, code: 200 };
    }

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to load books"));
    }

    return result;
}

// ── FIXED: createBookUser ────────────────────────────────────────────────────
export async function createBookUser(payload: CreateBookPayload): Promise<CreateBookResponse> {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await fetch(`/api/user/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    // Safe parse — server may return empty body on 500
    const result = await safeParseJson<CreateBookResponse>(response);
    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || `Server error (HTTP ${response.status}). Please try again.`) : `Server error (HTTP ${response.status}). Please try again.`
        );
    }

    if (!result) {
        throw new Error("Server returned an empty response.");
    }

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to create book"));
    }

    return result;
}

export async function updateBookUser(
    bookId: string | number,
    payload: UpdateBookPayload
): Promise<UpdateBookResponse> {
    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/user/books/${bookId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as UpdateBookResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to update book");
    }

    return result;
}

export async function sendBookInviteUser(bookId: string | number): Promise<SendBookInviteResponse> {
    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/user/books/${bookId}/invite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const responseText = await response.text();
    let result: SendBookInviteResponse;

    if (responseText) {
        try {
            result = JSON.parse(responseText) as SendBookInviteResponse;
        } catch {
            result = {
                success: response.ok,
                message: response.ok ? responseText : "Failed to send invitation",
                data: {
                    book_id: Number(bookId),
                    invite_link_id: 0,
                    name: "",
                    email: "",
                    status: 0,
                    updated_at: "",
                    created_at: "",
                    id: 0,
                    full_image_urls: [],
                },
                meta: {},
                code: response.status,
            };
        }
    } else {
        result = {
            success: response.ok,
            message: response.ok ? "Invitation sent successfully" : "Failed to send invitation",
            data: {
                book_id: Number(bookId),
                invite_link_id: 0,
                name: "",
                email: "",
                status: 0,
                updated_at: "",
                created_at: "",
                id: 0,
                full_image_urls: [],
            },
            meta: {},
            code: response.status,
        };
    }

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to send invitation");
    }

    return result;
}

export async function fetchBookDetails(bookId: string | number): Promise<BookDetailResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/user/books/${bookId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as BookDetailResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load book details");
    }

    return result;
}

export async function checkInContributor(code: string): Promise<CheckInResponse> {
    if (!code) {
        throw new Error("Check-in code is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/contribute/check-in/${code}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as CheckInResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Check-in failed");
    }

    return result;
}

export async function fetchInviteDetails(code: string): Promise<GetInviteResponse> {
    if (!code) {
        throw new Error("Invite code is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/invite/${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as GetInviteResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load invite details");
    }

    return result;
}

export async function submitContribution(
    inviterId: string | number,
    payload: SubmitContributionPayload
): Promise<SubmitContributionResponse> {
    if (!inviterId && inviterId !== 0) {
        throw new Error("Inviter ID is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/contribute/submit/${inviterId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as SubmitContributionResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to submit contribution");
    }

    return result;
}
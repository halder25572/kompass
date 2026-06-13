/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    RegisterPayload,
    LoginPayload,
    GoogleLoginPayload,
    ForgotPasswordPayload,
    VerifyOtpPayload,
    ResendOtpPayload,
    ResetPasswordPayload,
    ChangePasswordPayload,
    UpdateProfilePayload,
    UpdateLanguagePayload,
    LoginResponse,
    GoogleLoginResponse,
    RegisterResponse,
    ForgotPasswordResponse,
    VerifyOtpResponse,
    ResendOtpResponse,
    ResetPasswordResponse,
    ChangePasswordResponse,
    ShowUserResponse,
    UpdateProfileResponse,
    UpdateLanguageResponse,
    OccasionsResponse,
    BookPageStylesResponse,
    CoverPageStylesResponse,
    BooksResponse,
    CreateBookPayload,
    CreateBookResponse,
    UpdateBookPayload,
    UpdateBookResponse,
    SendBookInviteResponse,
    BookDetailResponse,
    CheckInResponse,
    GetInviteResponse,
    SubmitContributionPayload,
    ContributionsListResponse,
    ContributionDetailResponse,
    SubmitContributionResponse,

    LegalInformationResponse,
    PrivacyPoliciesResponse,
    TermsConditionsResponse,
    FaqsResponse,
    ContactPayload,
    ContactResponse,
    ApplyCouponPayload,
    AppliedCouponResponse,
    DeliveryTypesResponse,
    OrderPreviewPayload,
    OrderPreviewResponse,
    PlaceOrderPayload,
    PlaceOrderResponse,
    CreateStripeSessionPayload,
    CreateStripeSessionResponse,
    VerifyStripeSessionPayload,
    VerifyStripeSessionResponse,
} from "@/types/api";
// ContributionsResponse type remains in types for other modules; not imported here.

// Re-export types for backward compatibility
export type {
    RegisterPayload,
    LoginPayload,
    GoogleLoginPayload,
    ForgotPasswordPayload,
    VerifyOtpPayload,
    ResendOtpPayload,
    ResetPasswordPayload,
    ChangePasswordPayload,
    UpdateProfilePayload,
    UpdateLanguagePayload,
    LoginResponse,
    GoogleLoginResponse,
    RegisterResponse,
    ForgotPasswordResponse,
    VerifyOtpResponse,
    ResendOtpResponse,
    ResetPasswordResponse,
    ChangePasswordResponse,
    ShowUserResponse,
    UpdateProfileResponse,
    UpdateLanguageResponse,
    OccasionsResponse,
    BookPageStylesResponse,
    CoverPageStylesResponse,
    BooksResponse,
    CreateBookPayload,
    CreateBookResponse,
    UpdateBookPayload,
    UpdateBookResponse,
    SendBookInviteResponse,
    BookDetailResponse,
    CheckInResponse,
    GetInviteResponse,
    SubmitContributionPayload,
    SubmitContributionResponse,
    LegalInformationResponse,
    PrivacyPoliciesResponse,
    TermsConditionsResponse,
    FaqsResponse,
    ContactPayload,
    ContactResponse,
    ApplyCouponPayload,
    AppliedCouponResponse,
    DeliveryTypesResponse,
    OrderPreviewPayload,
    OrderPreviewResponse,
    PlaceOrderPayload,
    PlaceOrderResponse,
    CreateStripeSessionPayload,
    CreateStripeSessionResponse,
    VerifyStripeSessionPayload,
    VerifyStripeSessionResponse,
};

type ApiErrorShape = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

// helper function to get api error message
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

// get base url from env
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

function getAuthToken() {
    if (typeof window === "undefined") {
        return "";
    }

    return (
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("google-auth-exchanged-for") ||
        ""
    );
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

    if (!postResponse.ok || !postResult.success) {
        throw new Error(postResult?.message || "Google login failed");
    }

    return postResult;
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

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("email", payload.email);

    if (payload.phone && payload.phone.trim().length > 0) {
        formData.append("phone", payload.phone);
    }

    if (payload.avatar) {
        formData.append("avatar", payload.avatar);
    }

    const response = await fetch(`${BASE_URL}/user/update`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = (await response.json()) as UpdateProfileResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to update profile");
    }

    return result;
}

export async function updateLanguageUser(
    payload: UpdateLanguagePayload
): Promise<UpdateLanguageResponse> {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing.");
    }

    const attempts: Array<{ headers: Record<string, string>; body: BodyInit }> = [
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: new URLSearchParams({ language: payload.language }).toString(),
        },
    ];

    let lastError = "Failed to update language";

    for (const attempt of attempts) {
        const response = await fetch(`/api/user/update_language`, {
            method: "POST",
            cache: "no-store",
            headers: attempt.headers,
            body: attempt.body,
        });

        let result: UpdateLanguageResponse | null = null;
        try {
            result = await safeParseJson<UpdateLanguageResponse>(response);
        } catch {
            result = null;
        }

        if (result && response.ok && result.success) {
            return result;
        }

        lastError = result?.message || `Language update failed (HTTP ${response.status})`;
    }

    throw new Error(lastError);
}

export async function fetchOccasions(): Promise<OccasionsResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();

    const response = await fetch(`/api/user/occasions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        throw new Error("Base URL is missing.");
    }
    const token = getAuthToken();

    const response = await fetch(`/api/user/book-page-styles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as BookPageStylesResponse;

    if (!response.ok || !result.success) {
        return { success: false, message: result?.message ?? "", data: [], meta: {}, code: response.status };
    }

    return result;
}


export async function fetchCoverPageStyles(): Promise<CoverPageStylesResponse> {
    const token = getAuthToken();

    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`/api/user/cover-page`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as CoverPageStylesResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load cover page styles");
    }

    return result;
}



// New
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

function appendBookField(formData: FormData, key: string, value: unknown) {
    if (value === undefined || value === null) return;
    formData.append(key, String(value));
}

function buildBookFormData(payload: CreateBookPayload | UpdateBookPayload): FormData {
    const formData = new FormData();

    Object.entries(payload as unknown as Record<string, unknown>).forEach(([key, value]) => {
        if (key === "questions") return;
        if (key === "participant_order") return;
        if (key === "sub_occasion_id" && (value === "" || value === 0 || value === null)) return;
        appendBookField(formData, key, value);
    });

    const questions = payload.questions;
    if (Array.isArray(questions)) {
        questions.forEach((question, index) => {
            if (typeof question === "string" && question.trim()) {
                formData.append(`questions[${index}]`, question);
            }
        });
    }

    const participantOrder = (payload as any).participant_order;
    if (Array.isArray(participantOrder)) {
        participantOrder.forEach((item, index) => {
            if (item && typeof item === "object") {
                formData.append(`participant_order[${index}][participant_id]`, String(item.participant_id));
                formData.append(`participant_order[${index}][participant_number]`, String(item.participant_number));
            }
        });
    }

    return formData;
}

// ── FIXED: createBookUser ────────────────────────────────────────────────────
export async function createBookUser(payload: CreateBookPayload): Promise<CreateBookResponse> {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
    }

    const formData = buildBookFormData(payload);

    const response = await fetch(`/api/user/books`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    const formData = buildBookFormData(payload);
    const response = await fetch(`/api/user/books/${bookId}`, {
        method: "POST",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    const result = (await response.json()) as UpdateBookResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to update book");
    }

    return result;
}

// invite by email
export async function inviteByEmail(bookId: string | number, email: string, name?: string): Promise<SendBookInviteResponse> {
    if (!bookId && bookId !== 0) throw new Error("Book ID is required.");
    if (!email?.trim()) throw new Error("Email is required.");

    const token = getAuthToken();
    const response = await fetch(`/api/user/books/${bookId}/invite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
            email: email.trim(),
            ...(name?.trim() ? { name: name.trim() } : {}),
        }),
    });

    const result = await safeParseJson<SendBookInviteResponse>(response);

    return result ?? { success: response.ok, message: "", data: null, meta: {}, code: response.status };
}

// Book Details API (used in book details page, and also to get book info before final PDF generation)
export async function fetchBookDetails(bookId: string | number): Promise<BookDetailResponse> {
    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = getAuthToken();
    const response = await fetch(`/api/user/books/${bookId}`, {
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

export async function fetchBookContributions(
    bookId: string | number,
    authToken?: string | null
): Promise<ContributionsListResponse> {
    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = authToken ?? getAuthToken();
    const response = await fetch(`/api/user/books/${bookId}/contributions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {}),
        },
    });

    const responseText = await response.text();
    let result: ContributionsListResponse | null = null;

    if (responseText.trim()) {
        try {
            result = JSON.parse(responseText) as ContributionsListResponse;
        } catch {
            result = null;
        }
    }

    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || "Failed to load contributions") : "Failed to load contributions"
        );
    }

    if (!result) {
        return {
            success: response.ok,
            message: response.ok ? "" : `Failed to load contributions (HTTP ${response.status})`,
            data: null,
            meta: {},
            code: response.status,
        };
    }

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to load contributions"));
    }

    return result;
}

// Join invite (non-throwing) — returns backend response directly so UI can show message
export async function joinInviteByCode(code: string, name: string, email: string): Promise<CheckInResponse> {
    if (!code) throw new Error("Check-in code is required.");

    const checkInPath = code
        .split("/")
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    const response = await fetch(`/api/contribute/check-in/${checkInPath}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, participant_name: name, contributor_name: name, email }),
    });

    const rawBody = await response.text();

    if (!rawBody.trim()) {
        return { success: response.ok, message: "", data: null, meta: {}, code: response.status };
    }

    try {
        return JSON.parse(rawBody) as CheckInResponse;
    } catch {
        return {
            success: response.ok,
            message: rawBody.trim(),
            data: null,
            meta: {},
            code: response.status,
        };
    }
}

// Fetch invite details by code (used in contribution page to show invite info before joining)
export async function fetchInviteDetails(code: string): Promise<GetInviteResponse> {
    if (!code) {
        throw new Error("Invite code is required.");
    }

    const token = getAuthToken();
    const invitePath = code
        .split("/")
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join("/");
    const response = await fetch(`/api/invite/${invitePath}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = (await response.json()) as GetInviteResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load invite details");
    }

    return result;
}

// Submit contribution (used in contribution page) - throws on failure so UI can show error message
export async function submitContribution(
    inviterId: string | number,
    payload: SubmitContributionPayload
): Promise<SubmitContributionResponse>;
export async function submitContribution(
    inviterId: string | number,
    formData: FormData
): Promise<SubmitContributionResponse>;
export async function submitContribution(
    inviterId: string | number,
    payload: SubmitContributionPayload | FormData
): Promise<SubmitContributionResponse> {
    if (!inviterId && inviterId !== 0) {
        throw new Error("Inviter ID is required.");
    }

    // Use same-origin Next.js proxy so browser requests don't hit CORS or expose BASE_URL.
    const token = getAuthToken();
    const proxyUrl = `/api/contribute/submit/${inviterId}`;

    const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: payload instanceof FormData ? payload : (() => {
            const formData = new FormData();

            formData.append("name", payload.name);
            formData.append("participant_name", payload.name);
            formData.append("contributor_name", payload.name);
            formData.append("email", payload.email);

            payload.answers.forEach((answer, index) => {
                formData.append(`answers[${index}]`, answer);
            });

            payload.images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            return formData;
        })(),
    });

    const result = await safeParseJson<SubmitContributionResponse>(response);

    if (!response.ok) {
        throw new Error(result ? getApiErrorMessage(result, result.message || `Failed to submit contribution (HTTP ${response.status})`) : `Failed to submit contribution (HTTP ${response.status})`);
    }

    if (!result) {
        throw new Error("Server returned an empty response when submitting contribution");
    }

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to submit contribution"));
    }

    return result;
}

// Legal Information API
export async function fetchLegalInformation(): Promise<LegalInformationResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/legal-information`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as LegalInformationResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load legal information");
    }

    return result;
}

// Privacy Policies API
export async function fetchPrivacyPolicies(): Promise<PrivacyPoliciesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/privacy-policy`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as PrivacyPoliciesResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load privacy policies");
    }

    return result;
}

// Terms & Conditions API
export async function fetchTermsConditions(): Promise<TermsConditionsResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/terms-and-conditions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as TermsConditionsResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load terms and conditions");
    }

    return result;
}

// FAQs API
export async function fetchFaqs(): Promise<FaqsResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/faq`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as FaqsResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load FAQs");
    }

    return result;
}

// Contact API
export async function submitContactMessage(payload: ContactPayload): Promise<ContactResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ContactResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to send message");
    }

    return result;
}

// Apply Coupon API (used in order preview page) - throws on failure so UI can show error message
export async function applyCoupon(payload: ApplyCouponPayload): Promise<AppliedCouponResponse> {
    const token = getAuthToken();

    const response = await fetch(`/api/coupons/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as AppliedCouponResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to apply coupon");
    }

    return result;
}

// Delivery Types API
export async function fetchDeliveryTypes(countryCode: string): Promise<DeliveryTypesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const response = await fetch(`${BASE_URL}/delivery-types?country_code=${countryCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = (await response.json()) as DeliveryTypesResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to fetch delivery types");
    }

    return result;
}

// Order Preview API
export async function fetchOrderPreview(payload: OrderPreviewPayload): Promise<OrderPreviewResponse> {
    const token = getAuthToken();

    const response = await fetch(`/api/user/orders/preview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const result = (await response.json()) as OrderPreviewResponse;

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to fetch order preview");
    }

    return result;
}

// Create a Stripe PaymentIntent (server should return clientSecret and order id)
export async function createStripePaymentIntent(payload: { amount: number; currency?: string; metadata?: Record<string, any>; }): Promise<{ clientSecret?: string; orderId?: number | string; order_id?: number | string; }> {
    if (!BASE_URL) throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");

    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/payments/stripe/create-intent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (!response.ok) {
        let parsed: any = null;
        try { parsed = text ? JSON.parse(text) : null; } catch { }
        throw new Error(parsed?.message || `Server error (HTTP ${response.status}) creating payment intent`);
    }

    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return {};
    }
}

// Update order status — backend should support updating order by id
export async function updateOrderStatus(orderId: string | number, payload: { status: string;[k: string]: any }): Promise<any> {
    if (!BASE_URL) throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    if (!orderId && orderId !== 0) throw new Error("Order ID is required.");

    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/user/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    const result = await safeParseJson<any>(response);
    if (!response.ok) {
        throw new Error(result?.message || `Failed to update order (HTTP ${response.status})`);
    }

    return result;
}

// Contribution details API (used in contribution details page) - throws on failure so UI can show error message
function normalizeContributionDetail(result: unknown): ContributionDetailResponse {
    const response = result as ContributionDetailResponse & {
        data?: unknown;
    };

    const candidate = response?.data;

    if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
        const detailCandidate = candidate as Record<string, unknown>;
        const nested =
            detailCandidate.contribution ??
            detailCandidate.book_contribution ??
            detailCandidate.participant ??
            detailCandidate.item ??
            detailCandidate.data;

        if (nested && typeof nested === "object" && !Array.isArray(nested)) {
            response.data = nested as ContributionDetailResponse["data"];
        } else if (
            typeof detailCandidate.name === "string" ||
            typeof detailCandidate.email === "string" ||
            Array.isArray(detailCandidate.answers) ||
            Array.isArray(detailCandidate.images)
        ) {
            response.data = detailCandidate as ContributionDetailResponse["data"];
        }
    }

    return response;
}

export async function fetchContribution(contributionId: string | number): Promise<ContributionDetailResponse> {
    if (!contributionId && contributionId !== 0) {
        throw new Error("Contribution ID is required.");
    }

    const token = getAuthToken();

    const response = await fetch(`/api/user/books/contribution/${contributionId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = normalizeContributionDetail(await response.json());

    if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load contribution details");
    }

    return result;
}

// upload final pdf API
export async function uploadFinalPdf(bookId: string | number, file: Blob): Promise<{ success: boolean; message?: string; url?: string; code?: number; data?: any }> {
    if (!bookId && bookId !== 0) {
        throw new Error("Book ID is required.");
    }

    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
    }

    const formData = new FormData();
    formData.append("pdf_file", file, "final-book.pdf");

    // Use the existing same-origin Next.js proxy so the browser does not hit CORS/preflight issues.
    const proxyUrl = `/api/user/books/${bookId}/final-pdf`;

    const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const text = await response.text();
    if (!text) {
        if (!response.ok) throw new Error("Upload failed");
        // Backend returned empty response - assume success with no message
        return { success: true, message: "", url: "", data: null, code: response.status };
    }

    let result: any;
    try {
        result = JSON.parse(text);
    } catch {
        // If backend returns plain URL or HTML
        if (response.ok) {
            return { success: true, message: text, url: text, data: null, code: response.status };
        }
        throw new Error(`Upload failed: ${text || `HTTP ${response.status}`}`);
    }

    if (!response.ok) {
        throw new Error(result?.message || "Upload failed");
    }

    // Prefer backend's final_pdf_path when present
    const finalPdfPath = result?.data?.final_pdf_path ?? result?.data?.url ?? result?.url ?? result?.path ?? "";

    return { success: result.success ?? true, message: result.message, url: finalPdfPath, data: result?.data ?? result, code: result?.code ?? response.status };
}

// Place Order API — creates a new order on the backend
export async function placeOrder(payload: PlaceOrderPayload): Promise<PlaceOrderResponse> {
    if (!payload.book_id) throw new Error("Book ID is required.");
    if (!payload.delivery_type_id) throw new Error("Delivery type is required.");

    const token = getAuthToken();
    if (!token) throw new Error("Authentication token is missing. Please log in again.");

    // Build as form-data to match what the backend expects
    const formData = new FormData();
    (Object.keys(payload) as Array<keyof PlaceOrderPayload>).forEach((key) => {
        const value = payload[key];
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, String(value));
        }
    });

    const response = await fetch(`/api/user/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await safeParseJson<PlaceOrderResponse>(response);

    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || `Failed to place order (HTTP ${response.status})`) : `Failed to place order (HTTP ${response.status})`
        );
    }

    if (!result) throw new Error("Server returned an empty response when placing order.");

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to place order"));
    }

    return result;
}

// Create Stripe Checkout Session API
export async function createStripeSession(payload: CreateStripeSessionPayload): Promise<CreateStripeSessionResponse> {
    if (!payload.order_id) throw new Error("Order ID is required.");

    const token = getAuthToken();
    if (!token) throw new Error("Authentication token is missing. Please log in again.");

    // Build as form-data to match what the backend expects
    const formData = new FormData();
    formData.append("order_id", String(payload.order_id));

    const response = await fetch(`/api/user/payment/stripe/session`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await safeParseJson<CreateStripeSessionResponse>(response);

    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || `Failed to create Stripe session (HTTP ${response.status})`) : `Failed to create Stripe session (HTTP ${response.status})`
        );
    }

    if (!result) throw new Error("Server returned an empty response when creating Stripe session.");

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to create Stripe session"));
    }

    return result;
}

// Verify Stripe Checkout Session API
export async function verifyStripeSession(payload: VerifyStripeSessionPayload): Promise<VerifyStripeSessionResponse> {
    if (!payload.session_id) throw new Error("Session ID is required.");

    const token = getAuthToken();
    if (!token) throw new Error("Authentication token is missing. Please log in again.");

    // Build as form-data to match what the backend expects
    const formData = new FormData();
    formData.append("session_id", String(payload.session_id));

    const response = await fetch(`/api/user/payment/stripe/verify`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await safeParseJson<VerifyStripeSessionResponse>(response);

    if (!response.ok) {
        throw new Error(
            result ? getApiErrorMessage(result, result.message || `Failed to verify payment (HTTP ${response.status})`) : `Failed to verify payment (HTTP ${response.status})`
        );
    }

    if (!result) throw new Error("Server returned an empty response when verifying payment.");

    if (!result.success) {
        throw new Error(getApiErrorMessage(result, result.message || "Failed to verify payment"));
    }

    return result;
}
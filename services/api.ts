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
} from "@/types/api";

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
};

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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

function getAuthToken() {
    if (typeof window === "undefined") {
        return "";
    }

    return (
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
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
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

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
        const response = await fetch(`${BASE_URL}/user/update_language`, {
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

// export async function fetchBookPageStyles(): Promise<BookPageStylesResponse> {
//     if (!BASE_URL) {
//         throw new Error("Base URL is missing.");
//     }
//     const token = getAuthToken();

//     const response = await fetch(`/api/user/book-page-styles`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const result = (await response.json()) as BookPageStylesResponse;

//     if (!response.ok || !result.success) {
//         return { success: false, message: result?.message ?? "", data: [], meta: {}, code: response.status };
//     }

//     return result;
// }

// ✅ নতুন
export async function fetchBookPageStyles(): Promise<BookPageStylesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing.");
    }
    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/user/book-page-styles`, {
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

// export async function fetchCoverPageStyles(): Promise<CoverPageStylesResponse> {
//     const token = getAuthToken();

//     if (!BASE_URL) {
//         throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
//     }

//     const response = await fetch(`/api/user/cover-page`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//     });

//     const result = (await response.json()) as CoverPageStylesResponse;

//     if (!response.ok || !result.success) {
//         throw new Error(result?.message || "Failed to load cover page styles");
//     }

//     return result;
// }

// ✅ নতুন
export async function fetchCoverPageStyles(): Promise<CoverPageStylesResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }
    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/user/cover-page`, {
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

export async function applyCoupon(payload: ApplyCouponPayload): Promise<AppliedCouponResponse> {
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/coupons/apply`, {
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
    if (!BASE_URL) {
        throw new Error("Base URL is missing. Set NEXT_PUBLIC_BASE_URL in .env");
    }

    const token = getAuthToken();

    const response = await fetch(`${BASE_URL}/user/orders/preview`, {
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
/* eslint-disable @typescript-eslint/no-empty-object-type */
// ── Auth Interfaces ─────────────────────────────────────────────────────────
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

export interface UpdateProfilePayload {
    name: string;
    email: string;
    phone?: string;
    avatar?: File;
}

export interface UpdateLanguagePayload {
    language: "en" | "de";
}

// ── User Interfaces ─────────────────────────────────────────────────────────
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

// ── Auth Response Interfaces ────────────────────────────────────────────────
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

export interface UpdateLanguageResponse {
    success: boolean;
    message: string;
    data: {
        language: "en" | "de";
    };
    meta: Record<string, unknown>;
    code: number;
}

// ── Occasion & Styles Interfaces ────────────────────────────────────────────
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

// ── Coupon Interfaces ───────────────────────────────────────────────────────
export interface Coupon {
    id: number;
    code: string;
    discount: number;
    discount_type?: string;
    description?: string;
    expiry_date?: string;
    status: number;
}

export interface CouponsResponse {
    success: boolean;
    message: string;
    data: Coupon[];
    meta: Record<string, unknown>;
    code: number;
}

export interface BookPageStyle { }

export interface ApplyCouponPayload {
    code: string;
}
export interface AppliedCoupon {
    id: number;
    code: string;
    type: string;
    value: string;
    discount_amount: string;
    min_order_amount: string;
    max_discount: string | null;
    usage_limit: string | null;
    used_count: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

export interface AppliedCouponResponse {
    success: boolean;
    message: string;
    data: AppliedCoupon;
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

// ── Book Interfaces ─────────────────────────────────────────────────────────
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
    occasion_id: number | null;
    sub_occasion_id: number | null;
    book_page_style_id: number | null;
    cover_page_style_id: number | null;
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
    occasion?: string | null;
    sub_occasion?: string | null;
    occasion_id?: number | null;
    sub_occasion_id?: number | null;
    book_page_style_id?: number | null;
    cover_page_style_id?: number | null;
    questions?: string[] | null;
    final_pdf_path?: string | null;
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
    } | null;
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
    book_page_style_id: number | null;
    cover_page_style_id: number | null;
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
    } | null;
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

// ── Contribution Interfaces ─────────────────────────────────────────────────
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

export interface ContributionDetailResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        answers: string[];
        images: string[];
        status: string;
        submitted_at?: string;
    } | null;
    meta: Record<string, unknown>;
    code: number;
}

// Contribution list (from backend)
export interface Contribution {
    id: number;
    name: string;
    email: string;
    status?: string;
    answers: string[];
    images: string[];
    participant_number?: number; // optional explicit participant slot (1-based)
    created_at?: string;
}

export interface ContributionsResponse {
    success: boolean;
    message: string;
    data: Contribution[];
    meta: Record<string, unknown>;
    code: number;
}

export interface ContributionsListResponse {
    success: boolean;
    message: string;
    data: {
        book_id: number;
        book_title: string;
        statistics: {
            total: number;
            invited: number;
            pending: number;
            submitted: number;
            progress: string;
        };
        contributions: Contribution[];
    } | null;
    meta: Record<string, unknown>;
    code: number;
}

// ── Legal Information Interfaces ────────────────────────────────────────────
export interface CompanyDetails {
    company_name: string;
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
    represented_by_name: string;
    represented_by_position: string;
}

export interface ContactInformation {
    phone: string;
    email: string;
    website: string | null;
}

export interface RegistrationTax {
    register_court: string;
    registration_number: string;
    vat_number: string;
}

export interface EditorialResponsibility {
    responsible_person_name: string;
    responsible_company_name: string;
    responsible_address: string;
    responsible_postal_code: string;
    responsible_city: string;
}

export interface LegalInformation {
    company_details: CompanyDetails;
    contact_information: ContactInformation;
    registration_tax: RegistrationTax;
    editorial_responsibility: EditorialResponsibility;
}

export interface LegalInformationResponse {
    success: boolean;
    message: string;
    data: LegalInformation;
    meta: Record<string, unknown>;
    code: number;
}

// ── Privacy & Legal Interfaces ──────────────────────────────────────────────
export interface PrivacyPolicyItem {
    id: number;
    title: string;
    description: string;
    status: number;
}

export interface PrivacyPoliciesResponse {
    success: boolean;
    message: string;
    data: PrivacyPolicyItem[];
    meta: Record<string, unknown>;
    code: number;
}

export interface TermsConditionsItem {
    id: number;
    title: string;
    description: string;
    status: number;
}

export interface TermsConditionsResponse {
    success: boolean;
    message: string;
    data: TermsConditionsItem[];
    meta: Record<string, unknown>;
    code: number;
}

// ── FAQ Interfaces ──────────────────────────────────────────────────────────
export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    status: number;
}

export interface FaqsResponse {
    success: boolean;
    message: string;
    data: FaqItem[];
    meta: Record<string, unknown>;
    code: number;
}

// ── Contact Interfaces ──────────────────────────────────────────────────────
export interface ContactPayload {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    data: [];
    meta: Record<string, unknown>;
    code: number;
}

// ── Delivery Types Interfaces ────────────────────────────────────────────────
export interface DeliveryTypeVat {
    amount: number;
    type: string;
}

export interface DeliveryType {
    id: number;
    delivery_ty_name: string;
    country_code: string;
    country_name: string;
    fee: string;
    days: string;
    vat: DeliveryTypeVat;
}

export interface DeliveryTypesResponse {
    success: boolean;
    message: string;
    data: DeliveryType[];
    meta: Record<string, unknown>;
    code: number;
}

// ── Order Preview Interfaces ─────────────────────────────────────────────────
export interface OrderPreviewPayload {
    // Add fields based on your backend requirements
    // Common fields might include: book_id, delivery_type_id, country_code, etc.
    [key: string]: unknown;
}

export interface OrderPreviewData {
    subtotal: number;
    delivery_fee: number;
    vat_amount: number;
    discount: number;
    total_amount: number;
    currency: string;
}

export interface OrderPreviewResponse {
    success: boolean;
    message: string;
    data: OrderPreviewData;
    meta: Record<string, unknown>;
    code: number;
}

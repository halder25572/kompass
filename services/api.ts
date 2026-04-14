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

const BASE_URL =
process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_PUBLIC_URL || "";

function getAuthToken() {
if (typeof window === "undefined") {
return "";
}

return localStorage.getItem("token") || "";
}

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
throw new Error(result?.message || "Failed to change password");
}

return result;
}

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

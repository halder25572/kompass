import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	forgotPasswordUser,
	ForgotPasswordPayload,
	ForgotPasswordResponse,
	googleLoginUser,
	GoogleLoginPayload,
	GoogleLoginResponse,
	loginUser,
	LoginPayload,
	LoginResponse,
	registerUser,
	RegisterPayload,
	RegisterResponse,
	changePasswordUser,
	ChangePasswordPayload,
	ChangePasswordResponse,
	resetPasswordUser,
	ResetPasswordPayload,
	ResetPasswordResponse,
	resendOtpUser,
	ResendOtpPayload,
	ResendOtpResponse,
	showUser,
	ShowUserResponse,
	updateProfileUser,
	UpdateProfilePayload,
	UpdateProfileResponse,
	verifyOtpUser,
	VerifyOtpPayload,
	VerifyOtpResponse,
} from "@/services/api";

export function useRegisterMutation() {
	return useMutation<RegisterResponse, Error, RegisterPayload>({
		mutationFn: registerUser,
	});
}

export function useLoginMutation() {
	return useMutation<LoginResponse, Error, LoginPayload>({
		mutationFn: loginUser,
	});
}

export function useGoogleLoginMutation() {
	return useMutation<GoogleLoginResponse, Error, GoogleLoginPayload>({
		mutationFn: googleLoginUser,
	});
}

export function useForgotPasswordMutation() {
	return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
		mutationFn: forgotPasswordUser,
	});
}

export function useVerifyOtpMutation() {
	return useMutation<VerifyOtpResponse, Error, VerifyOtpPayload>({
		mutationFn: verifyOtpUser,
	});
}

export function useResetPasswordMutation() {
	return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
		mutationFn: resetPasswordUser,
	});
}

export function useChangePasswordMutation() {
	return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
		mutationFn: changePasswordUser,
	});
}

export function useResendOtpMutation() {
	return useMutation<ResendOtpResponse, Error, ResendOtpPayload>({
		mutationFn: resendOtpUser,
	});
}

export function useUserProfileQuery() {
	return useQuery<ShowUserResponse, Error>({
		queryKey: ["user-profile"],
		queryFn: showUser,
		retry: false,
	});
}

export function useUpdateProfileMutation() {
	const queryClient = useQueryClient();

	return useMutation<UpdateProfileResponse, Error, UpdateProfilePayload>({
		mutationFn: updateProfileUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
		},
	});
}

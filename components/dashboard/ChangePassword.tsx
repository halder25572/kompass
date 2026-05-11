"use client";

import { Eye, EyeOff, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/features/auth/components/hooks/services";

export default function ChangePassword() {
    const { mutate, isPending } = useChangePasswordMutation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            const message = "New password and confirm password do not match.";
            toast.error(message);
            setError(message);
            return;
        }

        mutate(
            {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            },
            {
                onSuccess: (response) => {
                    toast.success(response.message);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                },
                onError: (mutationError) => {
                    toast.error(mutationError.message);
                    setError(mutationError.message);
                },
            }
        );
    };

    return (
        <section style={{
            backgroundImage: "url('/images/bg1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
                <header className="px-6 py-4 flex items-center gap-2">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                </header>

                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="flex justify-center mb-3">
                            <div className="text-[#BF003A]">
                                <Key size={18} />
                            </div>
                        </div>

                        <h1 className="text-lg font-semibold text-gray-800">
                            Update Your Password
                        </h1>

                        <p className="text-sm text-gray-500 mt-1 mb-6">
                            Enter your current password & choose a new one
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Current Password
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Current password"
                                        value={currentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value)}
                                        className="w-full px-4 pr-11 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword((previous) => !previous)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#BF003A] cursor-pointer"
                                        aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                                    >
                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    New Password
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                        className="w-full px-4 pr-11 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((previous) => !previous)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#BF003A] cursor-pointer"
                                        aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Confirm New Password
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        className="w-full px-4 pr-11 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((previous) => !previous)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#BF003A] cursor-pointer"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error ? <p className="text-sm text-red-600">{error}</p> : null}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full mt-2 cursor-pointer py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 bg-linear-to-r from-[#BF003A] to-[#59001C] hover:opacity-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Key size={16} />
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
}

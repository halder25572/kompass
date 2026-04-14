/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Key, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserProfileQuery } from "@/features/auth/components/hooks/services";
import { useUpdateProfileMutation } from "@/features/auth/components/hooks/services";

export default function ProfileSection() {
    const { data, isLoading, error } = useUserProfileQuery();
    const { mutate, isPending } = useUpdateProfileMutation();
    const user = data?.data.user;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError("");

        mutate(
            {
                name,
                email,
                phone: phone || undefined,
            },
            {
                onSuccess: (response) => {
                    toast.success(response.message);
                },
                onError: (mutationError) => {
                    toast.error(mutationError.message);
                    setFormError(mutationError.message);
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
                {/* Header */}
                <header className="px-6 py-4 flex items-center gap-2">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                </header>

                {/* Center Content */}
                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-transparent text-center">
                        {/* Avatar */}
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden bg-white flex items-center justify-center text-gray-500">
                                {isLoading ? (
                                    <span className="text-sm">...</span>
                                ) : user?.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl font-medium">
                                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-lg font-semibold text-gray-800 mb-6">
                            {isLoading ? "Loading Profile..." : "Update Your Profile"}
                        </h1>

                        {error ? (
                            <p className="mb-4 text-sm text-red-600">
                                {error.message}
                            </p>
                        ) : null}

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="enter your full name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    placeholder="017xxxxxxxx"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {formError ? (
                                <p className="text-sm text-red-600">{formError}</p>
                            ) : null}

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#BF003A] to-[#59001C] cursor-pointer text-white py-2 rounded-md font-medium hover:opacity-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Save size={16} />
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </form>

                        {/* Change Password Card */}
                        <Link href="/dashboard/change-password">
                            <div className="mt-4 bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between hover:shadow-sm transition cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="text-red-600">
                                        <Key size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-800">
                                            Change Password
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Update your account password
                                        </p>
                                    </div>
                                </div>

                                <span className="text-gray-400 text-lg">→</span>
                            </div>
                        </Link>
                    </div>
                </main>
            </div>
        </section>
    );
}
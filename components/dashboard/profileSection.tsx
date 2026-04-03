"use client";

import { Key, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileSection() {
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
                            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                                ?
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-lg font-semibold text-gray-800 mb-6">
                            Update Your Profile
                        </h1>

                        {/* Form */}
                        <form className="space-y-4">
                            {/* Full Name */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="enter your full name"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#BF003A] to-[#59001C] cursor-pointer text-white py-2 rounded-md font-medium hover:opacity-95 transition"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </form>

                        {/* Change Password Card */}
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
                    </div>
                </main>
            </div>
        </section>
    );
}
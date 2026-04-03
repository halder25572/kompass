"use client";

import { Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChangePassword() {
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

                {/* Main */}
                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        {/* Icon */}
                        <div className="flex justify-center mb-3">
                            <div className="text-[#BF003A]">
                                <Key size={18} />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-lg font-semibold text-gray-800">
                            Update Your Password
                        </h1>

                        <p className="text-sm text-gray-500 mt-1 mb-6">
                            Enter your current password & choose a new one
                        </p>

                        {/* Form */}
                        <form className="space-y-4">
                            {/* Current Password */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="enter your full name"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                />
                            </div>

                            {/* New Password */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="text-left">
                                <label className="text-sm text-gray-600">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full mt-2 cursor-pointer py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 
              bg-linear-to-r from-[#BF003A] to-[#59001C] hover:opacity-95 transition"
                            >
                                <Key size={16} />
                                Save Changes
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
}
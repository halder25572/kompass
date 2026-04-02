"use client";

import { Copy, Plus, Trash2, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const participants = [
    { name: "Sarah M.", initials: "SM", status: "Submitted" },
    { name: "James K.", initials: "JK", status: "Submitted" },
    { name: "Emily R.", initials: "ER", status: "Pending" },
    { name: "Michael B.", initials: "MB", status: "Pending" },
    { name: "Lisa T.", initials: "LT", status: "Invited" },
    { name: "David W.", initials: "DW", status: "Invited" },
];

const statusStyle = {
    Submitted: "bg-green-500 text-white",
    Pending: "bg-purple-500 text-white",
    Invited: "bg-gray-200 text-gray-600",
};

export default function ProgressBar() {
    return (
        <div className="min-h-screen max-w-7xl mx-auto p-4 md:p-8">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                        <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                    </div>
                </Link>

                <div className="flex gap-3">
                    <button className="px-4 cursor-pointer py-2 text-sm border rounded-lg bg-white">
                        Preview
                    </button>
                    <button className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-[#8B0A2A] text-white">
                        Confirm Order
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    {/* PROGRESS CARD */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-600">Book Progress</span>
                            <span className="font-semibold gradient-text">80%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                            <div className="w-[80%] h-2 bg-linear-to-r from-[#BF003A] to-[#59001C] rounded-full" />
                        </div>

                        <div className="grid grid-cols-3 text-center">
                            <Stat number="6" label="Submitted" />
                            <Stat number="2" label="Pending" />
                            <Stat number="1" label="Invited" />
                        </div>
                    </div>

                    {/* PARTICIPANTS */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h2 className="text-sm font-medium mb-4">Participants</h2>

                        <div className="space-y-3">
                            {participants.map((p, i) => (
                                <div
                                    key={i}
                                    className="flex cursor-pointer items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
                                >
                                    <div className="flex items-center cursor-pointer gap-3">
                                        <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                                            {p.initials}
                                        </div>
                                        <span className="text-sm">{p.name}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${statusStyle[p.status as keyof typeof statusStyle]
                                                }`}
                                        >
                                            {p.status}
                                        </span>
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    {/* BOOK SETTINGS */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-medium">Book Settings</h2>
                            <button className="text-[14px] cursor-pointer px-3 py-1 rounded-md bg-linear-to-r from-[#BF003A] to-[#59001C] text-white">
                                Edit
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <Row label="Recipient Name" value="Jack" />
                            <Row label="Occasion" value="Birthday" />
                            <Row label="Deadline" value="Mar 20, 2026" />
                            <Row label="Contributors" value="15" />
                        </div>
                    </div>

                    {/* INVITE */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h2 className="text-sm font-medium mb-4">
                            Invite Contributors
                        </h2>

                        {/* SHARE LINK */}
                        <div className="flex items-center border rounded-lg overflow-hidden mb-3">
                            <input
                                className="flex-1 p-2 text-xs outline-none"
                                value="https://preview-keepsake..."
                                readOnly
                            />
                            <button className="p-2 bg-linear-to-r from-[#BF003A] to-[#59001C] text-white">
                                <Copy size={14} />
                            </button>
                        </div>

                        {/* EMAIL INPUTS */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <input
                                    className="flex-1 p-2 text-xs outline-none"
                                    placeholder="email@example.com"
                                />
                                <button className="p-2 text-white bg-linear-to-r from-[#BF003A] to-[#59001C]">
                                    <Plus size={14} />
                                </button>
                            </div>

                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <input
                                    className="flex-1 p-2 text-xs outline-none"
                                    placeholder="email@example.com"
                                />
                                <button className="p-2 text-white bg-linear-to-r from-[#BF003A] to-[#59001C]">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <button className="w-full cursor-pointer bg-linear-to-r from-[#BF003A] to-[#59001C] text-white py-2 rounded-lg text-sm">
                            Send Invites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* SMALL COMPONENTS */

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span>{value}</span>
        </div>
    );
}

function Stat({ number, label }: { number: string; label: string }) {
    return (
        <div>
            <p className="text-lg font-semibold">{number}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}
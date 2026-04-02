import type { FC } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Activity, Book } from "@/types";
import ActivityFeed from "./ActivityFeed";
import BookCard from "./Bookcard";
import Image from "next/image";


// ─── Mock data (replace with real API/DB calls) ───────────────────────────────

const mockBooks: Book[] = [
    {
        id: "1",
        title: "Team Farewell — Alex",
        pages: 1245,
        dueDate: "Mar 20, 2026",
        status: "In Progress",
        progress: 62,
    },
    {
        id: "2",
        title: "Mom's Birthday Book",
        pages: 48,
        dueDate: "Apr 10, 2026",
        status: "Draft",
        progress: 20,
    },
    {
        id: "3",
        title: "Our Anniversary",
        pages: 320,
        dueDate: "Feb 14, 2026",
        status: "Completed",
        progress: 100,
    },
];

const mockActivities: Activity[] = [
    {
        id: "1",
        message: "Sarah submitted her page for Mom's Birthday book",
        timeAgo: "3 hours ago",
        color: "rose",
    },
    {
        id: "2",
        message: "3 new contributors joined Team Farewell book",
        timeAgo: "6 hours ago",
        color: "blue",
    },
    {
        id: "3",
        message: "Our Anniversary book is ready for download!",
        timeAgo: "1 day ago",
        color: "green",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const DashboardPageMain: FC = () => {
    return (
        <div className="min-h-screen bg-[#faf9f7] pt-5">

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Page header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                    <Link
                        href="/create"
                        className="flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 active:scale-95 text-white text-xs font-medium px-3.5 py-2.5 rounded-xl transition-all duration-150 shrink-0 shadow-sm"
                    >
                        <Plus size={13} strokeWidth={2.5} />
                        Create New Book
                    </Link>
                </div>
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                            My Books
                        </h1>
                        <p className="text-xs text-gray-400 mt-1 font-light">
                            Manage your memory book projects
                        </p>
                    </div>
                </div>

                {/* Two-column layout on md+ */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Books list */}
                    {/* <div className="flex-1 space-y-3">
                            {mockBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}

                            {mockBooks.length === 0 && (
                                <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                                    <p className="text-sm text-gray-400 font-light">No books yet.</p>
                                    <Link
                                        href="/create"
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-700 hover:underline underline-offset-2"
                                    >
                                        <Plus size={12} /> Create your first book
                                    </Link>
                                </div>
                            )}
                        </div> */}
                    <div className="flex-1 space-y-3">
                        {mockBooks.map((book) => (
                            <Link key={book.id} href={`/dashboard/progress?bookId=${book.id}`} className="block cursor-pointer">
                                <BookCard book={book} />
                            </Link>
                        ))}

                        {mockBooks.length === 0 && (
                            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                                <p className="text-sm text-gray-400 font-light">
                                    No books yet.
                                </p>

                                <Link
                                    href="/create"
                                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-700 hover:underline underline-offset-2"
                                >
                                    <Plus size={12} /> Create your first book
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Activity sidebar */}
                    <div className="w-full md:w-64 lg:w-72 shrink-0">
                        <ActivityFeed activities={mockActivities} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPageMain;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { FC } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Activity, Book } from "@/types";
import ActivityFeed from "./ActivityFeed";
import BookCard from "./Bookcard";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useBooksQuery } from "@/features/books/hooks/services";
import type { BookItem } from "@/types/api";

// ─── Mock data (replace with real API/DB calls) ───────────────────────────────

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
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerBtnRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const { data: booksResponse, isLoading, isError } = useBooksQuery();



  const books: Book[] = (booksResponse?.data ?? []).map((book, index) => mapBookItemToBook(book, index));

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial hidden state
    gsap.set(
      [headerLogoRef.current, headerBtnRef.current, titleRef.current],
      { opacity: 0, y: 20 }
    );
    gsap.set(booksRef.current?.children ?? [], { opacity: 0, y: 28, scale: 0.98 });
    gsap.set(activityRef.current, { opacity: 0, x: 20 });

    // Entrance sequence
    tl.to(headerLogoRef.current, { opacity: 1, y: 0, duration: 0.5 })
      .to(headerBtnRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
      .to(booksRef.current?.children ?? [], {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, stagger: 0.1,
      }, "-=0.2")
      .to(activityRef.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.35");
  }, []);

  // Book card hover
  const onCardEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -3, boxShadow: "0 10px 28px rgba(0,0,0,0.09)", duration: 0.22, ease: "power2.out" });
  };
  const onCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.22, ease: "power2.inOut" });
  };

  // Create button hover
  const onBtnEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.18, ease: "power2.out" });
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.18, ease: "power2.inOut" });
  };

  function mapBookItemToBook(book: BookItem, index: number): Book {
    const rawStatus = typeof book.status === "string" ? book.status : "";
    const title = [book.book_title, book.title, book.name]
      .find((value) => typeof value === "string" && value.trim().length > 0)
      ?.trim() ?? "Untitled Book";

    const pages = typeof book.pages === "number"
      ? book.pages
      : typeof book.page_count === "number"
        ? book.page_count
        : 0;

    const submitted = typeof (book as any).submitted === "number" ? (book as any).submitted : undefined;
    const totalPages = typeof book.page_count === "number" ? book.page_count : (typeof book.pages === "number" ? book.pages : undefined);

    const dueDate = typeof book.dueDate === "string"
      ? book.dueDate
      : typeof book.due_date === "string"
        ? book.due_date
        : typeof book.updated_at === "string"
          ? new Date(book.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          : "No due date";

    const progress = typeof book.progress === "number"
      ? book.progress
      : rawStatus.toLowerCase() === "completed"
        ? 100
        : rawStatus.toLowerCase() === "draft"
          ? 20
          : 5; // default small progress for newly created/in-progress books

    const status: Book["status"] = rawStatus.toLowerCase() === "completed"
      ? "Completed"
      : rawStatus.toLowerCase() === "draft"
        ? "Draft"
        : "In Progress";

    return {
      id: String(book.id ?? index + 1),
      title,
      pages,
      submitted,
      totalPages,
      dueDate,
      status,
      progress,
    };
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-5">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div ref={headerLogoRef} className="flex flex-col items-start gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
                <span className="font-semibold text-lg">Mein HerzGeschenk</span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#BF003A] transition-colors"
            >
              <span aria-hidden="true">←</span>
              Back to home page
            </Link>
          </div>

          <Link
            ref={headerBtnRef}
            href="/create"
            onMouseEnter={onBtnEnter}
            onMouseLeave={onBtnLeave}
            className="flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 active:scale-95 text-white text-xs font-medium px-3.5 py-2.5 rounded-xl transition-colors duration-150 shrink-0 shadow-sm"
          >
            <Plus size={13} strokeWidth={2.5} />
            Create New Book
          </Link>
        </div>

        <div ref={titleRef} className="flex items-start justify-between gap-4 mb-6">
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
          <div ref={booksRef} className="flex-1 space-y-3">
            {isLoading && (
              <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                <p className="text-sm text-gray-400 font-light">Loading books...</p>
              </div>
            )}

            {isError && !isLoading && (
              <div className="bg-white border border-dashed border-red-200 rounded-2xl p-10 text-center">
                <p className="text-sm text-red-500 font-light">Failed to load books.</p>
              </div>
            )}

            {!isLoading && !isError && books.map((book) => (
              <Link
                key={book.id}
                href={`/dashboard/progress?bookId=${book.id}`}
                className="block cursor-pointer rounded-2xl"
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
              >
                <BookCard book={book} />
              </Link>
            ))}

            {!isLoading && !isError && books.length === 0 && (
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
          </div>

          {/* Activity sidebar */}
          <div ref={activityRef} className="w-full md:w-64 lg:w-72 shrink-0">
            <ActivityFeed activities={mockActivities} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPageMain;
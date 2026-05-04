"use client";

import BookCreator from "@/components/create/BookCreator";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function CreatePageContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            const query = searchParams.toString();
            const currentUrl = query ? `${pathname}?${query}` : pathname;
            router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }, [isAuthenticated, isLoading, pathname, router, searchParams]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F5F0EC] px-4">
                <div className="rounded-2xl border border-[#E8E2DC] bg-white px-6 py-5 text-sm text-[#78716C] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                    Please wait...
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="w-full min-h-screen px-4 py-4 sm:px-6 lg:px-8"
        >
            <Suspense fallback={<div className="min-h-screen" />}>
                <BookCreator />
            </Suspense>
        </div>
    );
}

export default function CreatePage() {
    return <CreatePageContent />;
}
"use client";

import BookCreator from "@/components/create/BookCreator";
import { Suspense } from "react";

function CreatePageContent() {
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
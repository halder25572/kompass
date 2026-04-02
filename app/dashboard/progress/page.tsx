"use client";

import { useSearchParams } from "next/navigation";
import ProgressBar from "@/components/dashboard/Progress";

const ProgressPage = () => {
    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");

    return (
        <div>
            {bookId && <p className="text-xs text-gray-400 mb-4">Book ID: {bookId}</p>}
            <ProgressBar />
        </div>
    );
};

export default ProgressPage;
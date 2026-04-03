"use client";

import { useSearchParams } from "next/navigation";
import ProgressBar from "@/components/dashboard/Progress";

const ProgressPageContent = () => {
    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");

    return (
        <div>
            {bookId && <p className="text-xs text-gray-400 mb-4">Book ID: {bookId}</p>}
            <ProgressBar bookId={bookId ?? ""} />
        </div>
    );
};

export default ProgressPageContent;

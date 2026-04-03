import ProgressPageContent from "@/components/dashboard/ProgressPageContent";
import { Suspense } from "react";

const ProgressPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ProgressPageContent />
        </Suspense>
    );
};

export default ProgressPage;
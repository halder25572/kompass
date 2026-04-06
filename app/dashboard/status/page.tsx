import { Suspense } from "react";
import StatusPageMain from "@/components/dashboard/status";


const StatusPage = () => {
    return (
        <Suspense fallback={null}>
            <StatusPageMain />
        </Suspense>
    );
};

export default StatusPage;
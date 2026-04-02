import type { FC } from "react";
import type { Activity } from "@/types";

const dotColor: Record<Activity["color"], string> = {
    rose: "bg-[#8B5CF6]",
    blue: "bg-[#8B5CF6]",
    green: "bg-[#8B5CF6]",
};

const ActivityFeed: FC<{ activities: Activity[] }> = ({ activities }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 h-full">
        <p className="text-[16px] font-semibold text-[#111827] mb-4 flex items-center gap-2">
            {/* <span className="w-4 h-4 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-[9px]">⚡</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 16.5C3.67213 16.5 3 15.8279 3 15V3C3 2.17213 3.67213 1.5 4.5 1.5H10.5C10.9795 1.49923 11.4395 1.68982 11.778 2.0295L14.469 4.7205C14.8096 5.05909 15.0008 5.51974 15 6V15C15 15.8279 14.3279 16.5 13.5 16.5H4.5" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.5 1.5V5.25C10.5 5.66394 10.8361 6 11.25 6H15M7.5 6.75H6M12 9.75H6M12 12.75H6" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Recent Activity
        </p>
        <ul className="space-y-4">
            {activities.map((a) => (
                <li key={a.id} className="flex gap-3 items-start group">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[a.color]}`} />
                    <div>
                        <p className="text-[14px] text-[#374151] leading-snug group-hover:text-gray-900 transition-colors">
                            {a.message}
                        </p>
                        <p className="text-[12px] text-[#9CA3AF] mt-0.5">{a.timeAgo}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default ActivityFeed;
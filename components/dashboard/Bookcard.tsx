import type { FC } from "react";
import { BookOpen, Calendar } from "lucide-react";
import type { Book } from "@/types";

const statusStyles: Record<Book["status"], string> = {
    "In Progress": "bg-rose-50 text-rose-700 border border-rose-200",
    Completed: "bg-green-50 text-green-700 border border-green-200",
    Draft: "bg-gray-100 text-gray-500 border border-gray-200",
};

const BookCard: FC<{ book: Book }> = ({ book }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                {/* <BookOpen size={14} strokeWidth={1.8} className="text-rose-700" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 7V21" stroke="url(#paint0_linear_2031_4240)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H3Z" stroke="url(#paint1_linear_2031_4240)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_2031_4240" x1="12" y1="7" x2="13.2033" y2="7.01749" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#BF003A" />
                            <stop offset="1" stop-color="#59001C" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_2031_4240" x1="2" y1="3" x2="24.8996" y2="8.17908" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#BF003A" />
                            <stop offset="1" stop-color="#59001C" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{book.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[book.status]}`}>
                        {book.status}
                    </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <BookOpen size={10} /> {book.pages} pgs
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar size={10} /> {book.dueDate}
                    </span>
                </div>
                <div className="mt-3">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] rounded-full transition-all duration-500"
                            style={{ width: `${book.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BookCard;
"use client";

import { useSearchParams } from "next/navigation";

export default function StatusPageMain() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold gradient-text">
          Book Status
        </h1>
        <p className="text-xs text-gray-400">
          Tracking contributions for Book ID: {bookId}
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROGRESS CARD */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Completion</span>
              <span className="font-semibold gradient-text">80%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div className="w-[80%] h-2 bg-linear-to-r from-[#BF003A] to-[#59001C] rounded-full" />
            </div>

            <div className="grid grid-cols-3 text-center">
              <Stat number="6" label="Submitted" />
              <Stat number="2" label="Pending" />
              <Stat number="1" label="Invited" />
            </div>
          </div>

          {/* CONTRIBUTORS LIST */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Contributors Status</h2>

            <div className="space-y-3">
              {mockUsers.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                      {user.initials}
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusStyle[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* SUMMARY */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-medium mb-4">Summary</h2>

            <div className="space-y-3 text-sm">
              <Row label="Total Contributors" value="15" />
              <Row label="Submitted" value="6" />
              <Row label="Pending" value="2" />
              <Row label="Invited" value="1" />
              <Row label="Deadline" value="Mar 20, 2026" />
            </div>
          </div>

          {/* ACTION */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <button className="w-full bg-linear-to-r from-[#BF003A] to-[#59001C] text-white py-2 rounded-lg text-sm">
              Send Reminder Emails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* MOCK DATA */
const mockUsers = [
  { name: "Sarah M.", initials: "SM", status: "Submitted" },
  { name: "James K.", initials: "JK", status: "Submitted" },
  { name: "Emily R.", initials: "ER", status: "Pending" },
  { name: "Michael B.", initials: "MB", status: "Pending" },
  { name: "Lisa T.", initials: "LT", status: "Invited" },
];

const statusStyle: Record<string, string> = {
  Submitted: "bg-green-500 text-white",
  Pending: "bg-purple-500 text-white",
  Invited: "bg-gray-200 text-gray-600",
};

/* COMPONENTS */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-semibold">{number}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
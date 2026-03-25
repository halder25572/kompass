// "use client";

// import Image from "next/image";
// import { useState } from "react";

// // ── Data ─────────────────────────────────────────────────
// const templates = [
//     { id: 1, name: "Classic", image: "/images/st1.jpg" },
//     { id: 2, name: "Modern", image: "/images/st2.jpg" },
//     { id: 3, name: "Warm & Cozy", image: "/images/st3.jpg" },
//     { id: 4, name: "Vintage", image: "/images/st4.jpg" },
//     { id: 5, name: "Garden", image: "/images/st5.jpg" },
//     { id: 6, name: "Sunset", image: "/images/st6.jpg" },
//     { id: 7, name: "Fresh", image: "/images/st7.jpg" },
//     { id: 8, name: "Confetti", image: "/images/st8.jpg" },
//     { id: 9, name: "Golden", image: "/images/st9.jpg" },
// ];

// const covers = [
//     { id: 1, name: "Classic", image: "/images/ste1.jpg" },
//     { id: 2, name: "Modern", image: "/images/ste2.jpg" },
//     { id: 3, name: "Warm & Cozy", image: "/images/ste3.jpg" },
//     { id: 4, name: "Classic", image: "/images/ste1.jpg" },
//     { id: 5, name: "Modern", image: "/images/ste2.jpg" },
//     { id: 6, name: "Warm & Cozy", image: "/images/ste3.jpg" },
//     { id: 7, name: "Classic", image: "/images/ste1.jpg" },
//     { id: 8, name: "Modern", image: "/images/ste2.jpg" },
//     { id: 9, name: "Warm & Cozy", image: "/images/ste3.jpg" },
// ];

// const occasions = [
//     { id: "Birthday", label: "Birthday", icon: "🎂" },
//     { id: "School", label: "School", icon: "🎓" },
//     { id: "Farewell", label: "Farewell", icon: "👋" },
//     { id: "Love", label: "Love", icon: "❤️" },
//     { id: "Family", label: "Family", icon: "👨‍👩‍👧" },
// ];

// const questionnairesByOccasion: Record<string, { id: number; question: string; placeholder: string; checked?: boolean }[]> = {
//     Birthday: [
//         { id: 1, question: "My life motto:", placeholder: "Words you live by..." },
//         { id: 2, question: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
//         { id: 3, question: "I get grumpy about:", placeholder: "What grinds your gears?" },
//         { id: 4, question: "The best invention ever:", placeholder: "Coffee? The internet?" },
//         { id: 5, question: "My ultimate dream:", placeholder: "Your biggest dream..." },
//         { id: 6, question: "My fondest childhood memory:", placeholder: "Share a cherished memory...", checked: true },
//     ],
//     School: [
//         { id: 1, question: "My favourite subject:", placeholder: "Math, Art, PE..." },
//         { id: 2, question: "Best school memory:", placeholder: "A moment you'll never forget..." },
//         { id: 3, question: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
//     ],
//     Farewell: [
//         { id: 1, question: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
//         { id: 2, question: "My biggest achievement:", placeholder: "Something you're proud of..." },
//         { id: 3, question: "Advice for those staying:", placeholder: "Words of wisdom..." },
//     ],
//     Love: [
//         { id: 1, question: "My favourite memory of us:", placeholder: "A special moment together..." },
//         { id: 2, question: "What I love most about you:", placeholder: "Your smile, your laugh..." },
//         { id: 3, question: "My wish for our future:", placeholder: "Dreams for us..." },
//     ],
//     Family: [
//         { id: 1, question: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
//         { id: 2, question: "What family means to me:", placeholder: "In your own words..." },
//         { id: 3, question: "My favourite family memory:", placeholder: "A moment we all remember..." },
//     ],
// };

// // ── Shared ───────────────────────────────────────────────
// // function Logo() {
// //     return (
// //         <div className="flex items-center gap-2">
// //             <div className="w-6 h-6 bg-[#B91C1C] rounded flex items-center justify-center">
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
// //                     <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
// //                 </svg>
// //             </div>
// //             <span className="text-[13px] font-semibold text-[#1a1a2e]">Memory Book</span>
// //         </div>
// //     );
// // }

// function TopBar({ step, total }: { step: number; total: number }) {
//     return (
//         <div className="px-5 py-3 flex flex-col gap-2 border-b border-[#f0edf1]">
//             {/* <Logo /> */}
//             <div className="flex flex-col gap-1">
//                 <span className="text-[11px] text-[#9CA3AF]">Step {step} of {total}</span>
//                 <div className="flex gap-1">
//                     {Array.from({ length: total }).map((_, i) => (
//                         <div key={i} className="h-1 flex-1 rounded-full overflow-hidden bg-[#e5e7eb]">
//                             <div className={`h-full rounded-full transition-all duration-500 ${i < step ? "bg-[#B91C1C]" : "bg-transparent"}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// function CheckIcon() {
//     return (
//         <div className="absolute top-2 right-2 w-5 h-5 bg-[#B91C1C] rounded-full flex items-center justify-center z-10">
//             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="20 6 9 17 4 12" />
//             </svg>
//         </div>
//     );
// }

// // ── Step 1 ───────────────────────────────────────────────
// function Step1({ onNext }: { onNext: () => void }) {
//     const [selected, setSelected] = useState(1);
//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
//                 <div className="mb-5">
//                     <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Choose a Template</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design template for your book.</p>
//                 </div>
//                 <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
//                     {templates.map((tpl) => (
//                         <button key={tpl.id} onClick={() => setSelected(tpl.id)}
//                             className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
//                             <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
//                                 <Image src={tpl.image} alt={tpl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
//                                 {selected === tpl.id && <CheckIcon />}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
//                                     <span className="text-white text-[11px] sm:text-[12px] font-medium">{tpl.name}</span>
//                                 </div>
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
//                 <div className="max-w-2xl mx-auto">
//                     <button onClick={onNext} className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                         Continue
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// // ── Step 2 ───────────────────────────────────────────────
// function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     const [selected, setSelected] = useState(1);
//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
//                 <div className="mb-5">
//                     <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
//                 </div>
//                 <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
//                     {covers.map((cover) => (
//                         <button key={cover.id} onClick={() => setSelected(cover.id)}
//                             className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
//                             <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
//                                 <Image src={cover.image} alt={cover.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
//                                 {selected === cover.id && <CheckIcon />}
//                                 <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
//                                     <span className="text-white text-[11px] sm:text-[12px] font-medium">{cover.name}</span>
//                                 </div>
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
//                 <div className="max-w-2xl mx-auto flex gap-3">
//                     <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//                         Back
//                     </button>
//                     <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                         Continue
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// // ── Step 3 ───────────────────────────────────────────────
// function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
//     const [bookTitle, setBookTitle] = useState("");
//     const [recipientName, setRecipientName] = useState("");
//     const [selectedOccasion, setSelectedOccasion] = useState("Birthday");
//     const [activeTab, setActiveTab] = useState("Birthday");
//     const [questions, setQuestions] = useState(questionnairesByOccasion);
//     const [answers, setAnswers] = useState<Record<string, string>>({});

//     const currentQuestions = questions[activeTab] ?? [];

//     const handleAddQuestion = () => {
//         const newQ = { id: Date.now(), question: "New question:", placeholder: "Your answer..." };
//         setQuestions(prev => ({ ...prev, [activeTab]: [...(prev[activeTab] ?? []), newQ] }));
//     };

//     const handleDeleteQuestion = (id: number) => {
//         setQuestions(prev => ({ ...prev, [activeTab]: (prev[activeTab] ?? []).filter(q => q.id !== id) }));
//     };

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full overflow-y-auto">
//                 <div className="mb-5">
//                     <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
//                 </div>
//                 <div className="mb-4">
//                     <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
//                     <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
//                         className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
//                 </div>
//                 <div className="mb-5">
//                     <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
//                     <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
//                         className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
//                 </div>
//                 <div className="mb-5">
//                     <label className="text-[13px] font-semibold text-[#374151] block mb-2">Occasion</label>
//                     <div className="grid grid-cols-3 gap-2">
//                         {occasions.map((occ) => (
//                             <button key={occ.id} onClick={() => { setSelectedOccasion(occ.id); setActiveTab(occ.id); }}
//                                 className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border text-[12px] font-medium transition-all cursor-pointer ${selectedOccasion === occ.id ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
//                                 <span className="text-[20px]">{occ.icon}</span>
//                                 {occ.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="flex gap-2 mb-4">
//                     {Object.keys(questions).slice(0, 3).map(tab => (
//                         <button key={tab} onClick={() => setActiveTab(tab)}
//                             className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all cursor-pointer ${activeTab === tab ? "bg-white border-[#1a1a2e] text-[#1a1a2e] font-semibold" : "border-[#e5e7eb] text-[#9CA3AF] hover:text-[#374151]"}`}>
//                             {tab}
//                         </button>
//                     ))}
//                 </div>
//                 <div className="bg-white-500 rounded-2xl border bg-white py-5 border-[#f0edf1] overflow-hidden mb-4">
//                     <div className="flex items-center gap-2 px-4 py-3 border-b border-[#f0edf1]">
//                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
//                         <span className="text-[13px] font-bold text-[#1a1a2e]">Questionnaire {activeTab.toUpperCase()}</span>
//                     </div>
//                     <p className="text-[11px] text-[#9CA3AF] px-4 pt-2 pb-1">Fill in the same questionnaire that invited contributors see.</p>
//                     <div className="divide-y divide-[#f9fafb]">
//                         {currentQuestions.map((q) => (
//                             <div key={q.id} className="px-4 py-3">
//                                 <div className="flex items-center justify-between mb-1.5">
//                                     <span className="text-[12px] font-medium text-[#374151]">{q.question}</span>
//                                     <div className="flex items-center gap-2">
//                                         {q.checked && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
//                                         <button className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
//                                         <button onClick={() => handleDeleteQuestion(q.id)} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg></button>
//                                     </div>
//                                 </div>
//                                 <input value={answers[`${activeTab}-${q.id}`] ?? ""} onChange={e => setAnswers(prev => ({ ...prev, [`${activeTab}-${q.id}`]: e.target.value }))}
//                                     placeholder={q.placeholder} className="w-full border border-[#f0edf1] rounded-lg px-3 bg-white py-2 text-[12px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-1 focus:ring-[#B91C1C]/30" />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="px-4 py-3 border-[#f0edf1]">
//                         <button onClick={handleAddQuestion} className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-semibold py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
//                             Add Question
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="sticky bottom-0 backdrop-blur-sm px-4 sm:px-6 py-4">
//                 <div className="max-w-2xl mx-auto flex gap-3">
//                     <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//                         Back
//                     </button>
//                     <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
//                         Continue
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }

// // ── Step 4 ───────────────────────────────────────────────
// interface Friend { name: string; email: string; }

// function Step4({ onBack }: { onBack: () => void }) {
//     const [friends, setFriends] = useState<Friend[]>([{ name: "", email: "" }]);
//     const [showSuccess, setShowSuccess] = useState(false);

//     const addFriend = () => setFriends(prev => [...prev, { name: "", email: "" }]);

//     const updateFriend = (idx: number, field: keyof Friend, value: string) => {
//         setFriends(prev => prev.map((f, i) => i === idx ? { ...f, [field]: value } : f));
//     };

//     const removeFriend = (idx: number) => {
//         if (friends.length === 1) return;
//         setFriends(prev => prev.filter((_, i) => i !== idx));
//     };

//     const filledCount = friends.filter(f => f.name && f.email).length;

//     return (
//         <>
//             <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
//                 <div className="mb-6">
//                     <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Invite Friends</h1>
//                     <p className="text-[13px] text-[#9CA3AF] mt-0.5">Add the people you&apos;d like to contribute to this book.</p>
//                 </div>

//                 <div className="flex flex-col gap-3">
//                     {friends.map((friend, idx) => (
//                         <div key={idx} className="flex flex-col sm:flex-row gap-2">
//                             <div className="flex-1">
//                                 <label className="text-[12px] font-semibold text-[#374151] block mb-1">Name</label>
//                                 <div className="relative">
//                                     <input
//                                         value={friend.name}
//                                         onChange={e => updateFriend(idx, "name", e.target.value)}
//                                         placeholder="Friend's name"
//                                         className="w-full border border-[#e5e7eb] bg-white rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex-1">
//                                 <label className="text-[12px] font-semibold text-[#374151] block mb-1">Email</label>
//                                 <div className="flex gap-2">
//                                     <input
//                                         value={friend.email}
//                                         onChange={e => updateFriend(idx, "email", e.target.value)}
//                                         placeholder="friend@email.com"
//                                         type="email"
//                                         className="flex-1 border border-[#e5e7eb] bg-white rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
//                                     />
//                                     {friends.length > 1 && (
//                                         <button onClick={() => removeFriend(idx)} className="text-[#9CA3AF] hover:text-red-500 transition-colors cursor-pointer px-1">
//                                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//                                             </svg>
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Add Another Friend */}
//                 <button
//                     onClick={addFriend}
//                     className="mt-4 w-full flex items-center justify-center gap-2 border border-dashed border-[#e5e7eb] text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] text-[13px] font-medium py-3 rounded-xl cursor-pointer transition-colors"
//                 >
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//                     </svg>
//                     Add Another Friend
//                 </button>
//             </div>

//             {/* Footer */}
//             <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
//                 <div className="max-w-2xl mx-auto flex gap-3">
//                     <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//                         Back
//                     </button>
//                     <button
//                         onClick={() => setShowSuccess(true)}
//                         className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
//                     >
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
//                         </svg>
//                         Send Invites
//                     </button>
//                 </div>
//             </div>

//             {/* Success Modal */}
//             {showSuccess && (
//                 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//                     <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
//                         {/* Circle check */}
//                         <div className="flex justify-center mb-4">
//                             <div className="w-14 h-14 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
//                                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <polyline points="20 6 9 17 4 12" />
//                                 </svg>
//                             </div>
//                         </div>

//                         <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Invites Sent!</h2>
//                         <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
//                             We&apos;ve sent invitation links to{" "}
//                             <span className="font-bold text-[#1a1a2e]">{Math.max(1, filledCount)} friend{filledCount !== 1 ? "s" : ""}</span>.
//                             They&apos;ll receive an email with a link to contribute to{" "}
//                             <span className="text-[#B91C1C] underline cursor-pointer">your book</span>.
//                         </p>

//                         <button
//                             onClick={() => setShowSuccess(false)}
//                             className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
//                         >
//                             Go to Book Project
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// // ── Main ─────────────────────────────────────────────────
// export default function BookCreator() {
//     const [step, setStep] = useState(1);
//     const TOTAL = 4;

//     return (
//         <div className="max-w-7xl mx-auto flex flex-col">
//             <TopBar step={step} total={TOTAL} />
//             {step === 1 && <Step1 onNext={() => setStep(2)} />}
//             {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
//             {step === 3 && <Step3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
//             {step === 4 && <Step4 onBack={() => setStep(3)} />}
//         </div>
//     );
// }


"use client";

import Image from "next/image";
import { useState } from "react";

// ── Data ─────────────────────────────────────────────────
const templates = [
    { id: 1, name: "Classic", image: "/images/st1.jpg" },
    { id: 2, name: "Modern", image: "/images/st2.jpg" },
    { id: 3, name: "Warm & Cozy", image: "/images/st3.jpg" },
    { id: 4, name: "Vintage", image: "/images/st4.jpg" },
    { id: 5, name: "Garden", image: "/images/st5.jpg" },
    { id: 6, name: "Sunset", image: "/images/st6.jpg" },
    { id: 7, name: "Fresh", image: "/images/st7.jpg" },
    { id: 8, name: "Confetti", image: "/images/st8.jpg" },
    { id: 9, name: "Golden", image: "/images/st9.jpg" },
];

const covers = [
    { id: 1, name: "Classic", image: "/images/ste1.jpg" },
    { id: 2, name: "Modern", image: "/images/ste2.jpg" },
    { id: 3, name: "Warm & Cozy", image: "/images/ste3.jpg" },
    { id: 4, name: "Classic", image: "/images/ste1.jpg" },
    { id: 5, name: "Modern", image: "/images/ste2.jpg" },
    { id: 6, name: "Warm & Cozy", image: "/images/ste3.jpg" },
    { id: 7, name: "Classic", image: "/images/ste1.jpg" },
    { id: 8, name: "Modern", image: "/images/ste2.jpg" },
    { id: 9, name: "Warm & Cozy", image: "/images/ste3.jpg" },
];

const occasions = [
    { id: "Birthday", label: "Birthday", icon: "🎂" },
    { id: "School", label: "School", icon: "🎓" },
    { id: "Farewell", label: "Farewell", icon: "👋" },
    { id: "Love", label: "Love", icon: "❤️" },
    { id: "Family", label: "Family", icon: "👨‍👩‍👧" },
];

// Sub-tabs per occasion
const subOccasionsByOccasion: Record<string, string[]> = {
    Birthday: ["Birthday", "Anniversary"],
    School: ["Class Book", "Kindergarten", "Farewell Teacher", "End-of-Year Book"],
    Farewell: ["Retirement", "Team Memory Book"],
    Love: ["Wedding", "Bachelorette Party (JGA)"],
    Family: ["Family Book", "For Mom", "For Dad", "Baby Book", "For Grandma / Grandpa"],
};

// Questionnaires keyed by sub-occasion
const questionnairesBySubOccasion: Record<
    string,
    { id: number; question: string; placeholder: string; checked?: boolean }[]
> = {
    Birthday: [
        { id: 1, question: "My life motto:", placeholder: "Words you live by..." },
        { id: 2, question: "This is what I wanted to be when I was a child:", placeholder: "An astronaut, a doctor..." },
        { id: 3, question: "I get grumpy about:", placeholder: "What grinds your gears?" },
        { id: 4, question: "The best invention ever:", placeholder: "Coffee? The internet?" },
        { id: 5, question: "My ultimate dream:", placeholder: "Your biggest dream..." },
        { id: 6, question: "My fondest childhood memory:", placeholder: "Share a cherished memory...", checked: true },
    ],
    Anniversary: [
        { id: 1, question: "My favourite memory of us:", placeholder: "A special moment together..." },
        { id: 2, question: "What I love most about you:", placeholder: "Your smile, your laugh..." },
        { id: 3, question: "My wish for our future:", placeholder: "Dreams for us..." },
    ],
    "Class Book": [
        { id: 1, question: "My favourite subject:", placeholder: "Math, Art, PE..." },
        { id: 2, question: "Best school memory:", placeholder: "A moment you'll never forget..." },
        { id: 3, question: "What I'll miss most:", placeholder: "Friends, teachers, lunch..." },
    ],
    Kindergarten: [
        { id: 1, question: "My favourite game:", placeholder: "Hide and seek, painting..." },
        { id: 2, question: "My best friend:", placeholder: "Who do you love playing with?" },
        { id: 3, question: "What I want to be when I grow up:", placeholder: "A superhero? A chef?" },
    ],
    "Farewell Teacher": [
        { id: 1, question: "What I admired most about this teacher:", placeholder: "Their patience, creativity..." },
        { id: 2, question: "A lesson I'll never forget:", placeholder: "Something they taught me..." },
        { id: 3, question: "Thank you for:", placeholder: "Words of gratitude..." },
    ],
    "End-of-Year Book": [
        { id: 1, question: "My highlight of this school year:", placeholder: "A trip, a project..." },
        { id: 2, question: "What I learned:", placeholder: "Skills or lessons..." },
        { id: 3, question: "My goals for next year:", placeholder: "What I want to achieve..." },
    ],
    Retirement: [
        { id: 1, question: "What I enjoyed most working here:", placeholder: "The people, the projects..." },
        { id: 2, question: "My biggest achievement:", placeholder: "Something you're proud of..." },
        { id: 3, question: "Advice for those staying:", placeholder: "Words of wisdom..." },
    ],
    "Team Memory Book": [
        { id: 1, question: "Best team moment:", placeholder: "A win, a laugh, a milestone..." },
        { id: 2, question: "What made our team special:", placeholder: "The culture, the people..." },
        { id: 3, question: "What I'll miss most:", placeholder: "The daily standups, lunch trips..." },
    ],
    Wedding: [
        { id: 1, question: "My wish for the couple:", placeholder: "Love, laughter, adventure..." },
        { id: 2, question: "A favourite memory with the couple:", placeholder: "A special moment together..." },
        { id: 3, question: "Advice for a happy marriage:", placeholder: "Your best tip..." },
    ],
    "Bachelorette Party (JGA)": [
        { id: 1, question: "My funniest memory with the bride:", placeholder: "A hilarious moment..." },
        { id: 2, question: "What I love about her:", placeholder: "Her laugh, her kindness..." },
        { id: 3, question: "My wish for her future:", placeholder: "Everything she deserves..." },
    ],
    "Family Book": [
        { id: 1, question: "A family tradition I treasure:", placeholder: "Sunday dinners, holiday trips..." },
        { id: 2, question: "What family means to me:", placeholder: "In your own words..." },
        { id: 3, question: "My favourite family memory:", placeholder: "A moment we all remember..." },
    ],
    "For Mom": [
        { id: 1, question: "My favourite thing Mom always says:", placeholder: "Her classic phrase..." },
        { id: 2, question: "A lesson Mom taught me:", placeholder: "Something she showed me..." },
        { id: 3, question: "My fondest memory with Mom:", placeholder: "A special moment..." },
    ],
    "For Dad": [
        { id: 1, question: "My favourite thing Dad always does:", placeholder: "His habits, his humour..." },
        { id: 2, question: "Something Dad taught me:", placeholder: "A skill, a value..." },
        { id: 3, question: "My fondest memory with Dad:", placeholder: "A special moment..." },
    ],
    "Baby Book": [
        { id: 1, question: "My wish for this little one:", placeholder: "Health, joy, adventure..." },
        { id: 2, question: "What I love about babies:", placeholder: "Their laughter, their wonder..." },
        { id: 3, question: "Advice for new parents:", placeholder: "Your best tip..." },
    ],
    "For Grandma / Grandpa": [
        { id: 1, question: "My favourite memory with Grandma/Grandpa:", placeholder: "A special moment..." },
        { id: 2, question: "The best thing they taught me:", placeholder: "A lesson or skill..." },
        { id: 3, question: "What I love most about them:", placeholder: "Their warmth, their stories..." },
    ],
};

// ── Shared ───────────────────────────────────────────────
function TopBar({ step, total }: { step: number; total: number }) {
    return (
        <div className="px-5 py-3 flex flex-col gap-2 border-b border-[#f0edf1]">
            <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#9CA3AF]">Step {step} of {total}</span>
                <div className="flex gap-1">
                    {Array.from({ length: total }).map((_, i) => (
                        <div key={i} className="h-1 flex-1 rounded-full overflow-hidden bg-[#e5e7eb]">
                            <div className={`h-full rounded-full transition-all duration-500 ${i < step ? "bg-[#B91C1C]" : "bg-transparent"}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <div className="absolute top-2 right-2 w-5 h-5 bg-[#B91C1C] rounded-full flex items-center justify-center z-10">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
    );
}

// ── Step 1: Book Details ──────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
    const [bookTitle, setBookTitle] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState("Birthday");
    const [activeSubTab, setActiveSubTab] = useState("Birthday");
    const [questions, setQuestions] = useState(questionnairesBySubOccasion);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const subTabs = subOccasionsByOccasion[selectedOccasion] ?? [];
    const currentQuestions = questions[activeSubTab] ?? [];

    const handleOccasionChange = (occasionId: string) => {
        setSelectedOccasion(occasionId);
        const firstSub = subOccasionsByOccasion[occasionId]?.[0] ?? "";
        setActiveSubTab(firstSub);
    };

    const handleAddQuestion = () => {
        const newQ = { id: Date.now(), question: "New question:", placeholder: "Your answer..." };
        setQuestions(prev => ({ ...prev, [activeSubTab]: [...(prev[activeSubTab] ?? []), newQ] }));
    };

    const handleDeleteQuestion = (id: number) => {
        setQuestions(prev => ({ ...prev, [activeSubTab]: (prev[activeSubTab] ?? []).filter(q => q.id !== id) }));
    };

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full overflow-y-auto">
                <div className="mb-5">
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Book Details</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Tell us about the person and occasion.</p>
                </div>

                {/* Book Title */}
                <div className="mb-4">
                    <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Book Title</label>
                    <input value={bookTitle} onChange={e => setBookTitle(e.target.value)} placeholder="e.g., Mom's 60th Birthday Book"
                        className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                </div>

                {/* Recipient Name */}
                <div className="mb-5">
                    <label className="text-[13px] font-semibold text-[#374151] block mb-1.5">Recipient Name</label>
                    <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="e.g., Sarah Johnson"
                        className="w-full border bg-white border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all" />
                </div>

                {/* Occasion Picker */}
                <div className="mb-4">
                    <label className="text-[13px] font-semibold text-[#374151] block mb-2">Pick Your Occasion</label>
                    <div className="grid grid-cols-3 gap-2">
                        {occasions.map((occ) => (
                            <button key={occ.id} onClick={() => handleOccasionChange(occ.id)}
                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border text-[12px] font-medium transition-all cursor-pointer ${selectedOccasion === occ.id ? "border-[#B91C1C] bg-[#fff5f6] text-[#B91C1C]" : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#B91C1C]/50"}`}>
                                <span className="text-[20px]">{occ.icon}</span>
                                {occ.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub-occasion tabs */}
                {subTabs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {subTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all cursor-pointer whitespace-nowrap ${
                                    activeSubTab === tab
                                        ? "bg-white border-[#1a1a2e] text-[#1a1a2e] font-semibold"
                                        : "border-[#e5e7eb] text-[#9CA3AF] hover:text-[#374151] bg-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {/* Questionnaire */}
                <div className="bg-white rounded-2xl border border-[#f0edf1] overflow-hidden mb-4">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#f0edf1]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        <span className="text-[13px] font-bold text-[#1a1a2e]">Questionnaire {activeSubTab.toUpperCase()}</span>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] px-4 pt-2 pb-1">Fill in the same questionnaire that invited contributors see.</p>
                    <div className="divide-y divide-[#f9fafb]">
                        {currentQuestions.map((q) => (
                            <div key={q.id} className="px-4 py-3">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[12px] font-medium text-[#374151]">{q.question}</span>
                                    <div className="flex items-center gap-2">
                                        {q.checked && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                                        <button className="text-[#9CA3AF] hover:text-[#374151] cursor-pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                                        <button onClick={() => handleDeleteQuestion(q.id)} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg></button>
                                    </div>
                                </div>
                                <input value={answers[`${activeSubTab}-${q.id}`] ?? ""} onChange={e => setAnswers(prev => ({ ...prev, [`${activeSubTab}-${q.id}`]: e.target.value }))}
                                    placeholder={q.placeholder} className="w-full border border-[#f0edf1] rounded-lg px-3 bg-white py-2 text-[12px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-1 focus:ring-[#B91C1C]/30" />
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-3">
                        <button onClick={handleAddQuestion} className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-semibold py-2.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Add Question
                        </button>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
                <div className="max-w-2xl mx-auto">
                    <button onClick={onNext} className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
}

// ── Step 2: Choose a Template ────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);
    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
                <div className="mb-5">
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Choose a Book Style</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design template for your book.</p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {templates.map((tpl) => (
                        <button key={tpl.id} onClick={() => setSelected(tpl.id)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === tpl.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-4/3 bg-[#d1cfc8]">
                                <Image src={tpl.image} alt={tpl.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                {selected === tpl.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{tpl.name}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back
                    </button>
                    <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
}

// ── Step 3: Choose a Cover ───────────────────────────────
function Step3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState(1);
    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
                <div className="mb-5">
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Choose a Cover</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Pick a design cover for your book.</p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {covers.map((cover) => (
                        <button key={cover.id} onClick={() => setSelected(cover.id)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${selected === cover.id ? "ring-2 ring-[#B91C1C] ring-offset-2" : "ring-1 ring-transparent hover:ring-[#B91C1C]/40"}`}>
                            <div className="relative w-full aspect-3/4 bg-[#d1cfc8]">
                                <Image src={cover.image} alt={cover.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                {selected === cover.id && <CheckIcon />}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-2 py-2">
                                    <span className="text-white text-[11px] sm:text-[12px] font-medium">{cover.name}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back
                    </button>
                    <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
}

// ── Step 4: Invite Friends ───────────────────────────────
interface Friend { name: string; email: string; }

function Step4({ onBack }: { onBack: () => void }) {
    const [friends, setFriends] = useState<Friend[]>([{ name: "", email: "" }]);
    const [showSuccess, setShowSuccess] = useState(false);

    const addFriend = () => setFriends(prev => [...prev, { name: "", email: "" }]);

    const updateFriend = (idx: number, field: keyof Friend, value: string) => {
        setFriends(prev => prev.map((f, i) => i === idx ? { ...f, [field]: value } : f));
    };

    const removeFriend = (idx: number) => {
        if (friends.length === 1) return;
        setFriends(prev => prev.filter((_, i) => i !== idx));
    };

    const filledCount = friends.filter(f => f.name && f.email).length;

    return (
        <>
            <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1a1a2e]">Invite Friends</h1>
                    <p className="text-[13px] text-[#9CA3AF] mt-0.5">Add the people you&apos;d like to contribute to this book.</p>
                </div>

                <div className="flex flex-col gap-3">
                    {friends.map((friend, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1">
                                <label className="text-[12px] font-semibold text-[#374151] block mb-1">Name</label>
                                <input
                                    value={friend.name}
                                    onChange={e => updateFriend(idx, "name", e.target.value)}
                                    placeholder="Friend's name"
                                    className="w-full border border-[#e5e7eb] bg-white rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[12px] font-semibold text-[#374151] block mb-1">Email</label>
                                <div className="flex gap-2">
                                    <input
                                        value={friend.email}
                                        onChange={e => updateFriend(idx, "email", e.target.value)}
                                        placeholder="friend@email.com"
                                        type="email"
                                        className="flex-1 border border-[#e5e7eb] bg-white rounded-xl px-4 py-2.5 text-[13px] text-[#374151] placeholder:text-[#d1d5db] outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] transition-all"
                                    />
                                    {friends.length > 1 && (
                                        <button onClick={() => removeFriend(idx)} className="text-[#9CA3AF] hover:text-red-500 transition-colors cursor-pointer px-1">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addFriend}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-dashed border-[#e5e7eb] text-[#6b7280] hover:border-[#B91C1C] hover:text-[#B91C1C] text-[13px] font-medium py-3 rounded-xl cursor-pointer transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Another Friend
                </button>
            </div>

            <div className="sticky bottom-0 backdrop-blur-sm border-[#f0edf1] px-4 sm:px-6 py-4">
                <div className="max-w-2xl mx-auto flex gap-3">
                    <button onClick={onBack} className="flex items-center justify-center gap-2 border border-[#e5e7eb] bg-white text-[#374151] font-semibold text-[15px] py-3.5 px-6 rounded-xl cursor-pointer hover:bg-[#f9fafb] transition-colors w-2/5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back
                    </button>
                    <button
                        onClick={() => setShowSuccess(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[15px] py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                        Send Invites
                    </button>
                </div>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full border-2 border-[#B91C1C] flex items-center justify-center">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-[20px] font-bold text-[#1a1a2e] mb-2">Invites Sent!</h2>
                        <p className="text-[13px] text-[#6b7280] leading-relaxed mb-6">
                            We&apos;ve sent invitation links to{" "}
                            <span className="font-bold text-[#1a1a2e]">{Math.max(1, filledCount)} friend{filledCount !== 1 ? "s" : ""}</span>.
                            They&apos;ll receive an email with a link to contribute to{" "}
                            <span className="text-[#B91C1C] underline cursor-pointer">your book</span>.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white font-semibold text-[14px] py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                        >
                            Go to Book Project
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// ── Main ─────────────────────────────────────────────────
export default function BookCreator() {
    const [step, setStep] = useState(1);
    const TOTAL = 4;

    return (
        <div className="max-w-7xl mx-auto flex flex-col">
            <TopBar step={step} total={TOTAL} />
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <Step4 onBack={() => setStep(3)} />}
        </div>
    );
}
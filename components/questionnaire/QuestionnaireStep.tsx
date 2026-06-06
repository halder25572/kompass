"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBookDetailsQuery } from "@/features/books/hooks/services";
import { submitContribution } from "@/services/api";
import { getDefaultContributorPhotos } from "@/lib/contributor";

type QuestionItem = {
    id: string;
    label: string;
    placeholder: string;
    textarea: boolean;
};

interface Props {
    inviterId: string | number;
    name: string;
    email: string;
    bookId?: string;
    questions?: string[];
    bookTitle?: string;
    recipientName?: string;
    occasion?: string;
    /** True when the check-in API confirmed this person has already submitted once. */
    isAlreadySubmitted?: boolean;
}

function questionToItem(question: string, index: number): QuestionItem {
    const normalized = question.trim();
    const lower = normalized.toLowerCase();

    return {
        id: `question-${index}`,
        label: normalized,
        placeholder: `Answer to: ${normalized}`,
        textarea: lower.length > 80 || /memory|describe|share|tell/i.test(lower),
    };
}

export default function QuestionnaireStep({ inviterId, name, email, bookId, questions: inviteQuestions, bookTitle, recipientName, occasion, isAlreadySubmitted }: Props) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [showDone, setShowDone] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNoPhotoConfirm, setShowNoPhotoConfirm] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    // If parent didn't provide bookTitle/occasion, fetch book details using bookId
    const { data: bookDetails } = useBookDetailsQuery(bookId);

    const fetchedRecipientName = bookDetails?.data?.book_details?.recipient_name ?? undefined;
    const fetchedOccasion = bookDetails?.data?.book_details?.occasion ?? undefined;

    const questions = useMemo<QuestionItem[]>(() => {
        const questionStrings = bookDetails?.data?.book_details?.questions ?? inviteQuestions ?? [];
        const source = questionStrings.length > 0 ? questionStrings : [];
        return source.map(questionToItem);
    }, [bookDetails, inviteQuestions]);

    const displaySubtitle = (() => {
        const resolvedRecipientName = recipientName?.trim() || fetchedRecipientName?.trim();

        if (resolvedRecipientName) {
            if (occasion) return `${resolvedRecipientName}'s ${occasion}`;
            if (fetchedOccasion) return `${resolvedRecipientName}'s ${fetchedOccasion}`;
            return `${resolvedRecipientName}'s Book`;
        }

        if (bookTitle && bookTitle.trim()) return bookTitle;
        if (occasion) return occasion;
        if (fetchedOccasion) return fetchedOccasion;
        return "the book";
    })();

    const setAnswer = (id: string, val: string) =>
        setAnswers(prev => ({ ...prev, [id]: val }));

    const handleAddPhotos = async (files: FileList) => {
        const remaining = Math.max(0, 2 - photos.length);
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        const selectedFiles: File[] = [];

        for (const file of Array.from(files)) {
            if (selectedFiles.length >= remaining) break;
            if (!allowedTypes.includes(file.type)) {
                toast.error(`File "${file.name}" is not a supported format. Please upload PNG, JPG, WEBP, or GIF.`);
                continue;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`File "${file.name}" exceeds the 10MB size limit.`);
                continue;
            }
            selectedFiles.push(file);
        }

        setPhotos(prev => [...prev, ...selectedFiles]);
    };

    useEffect(() => {
        const previewUrls = photos.map(file => URL.createObjectURL(file));
        setPhotoPreviews(previewUrls);

        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photos]);

    const doSubmit = async () => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("participant_name", name);
            formData.append("contributor_name", name);
            formData.append("email", email);

            // If this person already submitted before, signal the backend to replace
            // rather than append images. Common field names used by Laravel-based APIs:
            if (isAlreadySubmitted) {
                formData.append("_method", "PUT");
                formData.append("replace_images", "1");
            }

            questions.forEach((question, index) => {
                formData.append(`answers[${index}]`, answers[question.id] ?? "");
            });

            photos.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            if (photos.length === 0) {
                // Fetch each placeholder URL as a real image file so the API
                // receives an actual multipart file rather than a plain-text URL.
                const placeholderUrls = getDefaultContributorPhotos(2);
                await Promise.all(
                    placeholderUrls.map(async (url, index) => {
                        try {
                            const res = await fetch(url);
                            const blob = await res.blob();
                            const ext = blob.type.split("/")[1] ?? "jpg";
                            const file = new File([blob], `placeholder_${index}.${ext}`, { type: blob.type });
                            formData.append(`images[${index}]`, file);
                        } catch {
                            // If the fetch fails (e.g. offline), skip this placeholder silently
                        }
                    })
                );
            }

            await submitContribution(inviterId, formData);

            await queryClient.invalidateQueries({
                queryKey: bookId ? ["contributions", bookId] : ["contributions"],
            });

            if (bookId) {
                await queryClient.refetchQueries({ queryKey: ["contributions", bookId] });
            }

            if (bookId) {
                await queryClient.invalidateQueries({ queryKey: ["book", bookId] });
            }

            setShowDone(true);
            toast.success("Your contribution has been sent.");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to submit contribution";
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        if (!inviterId && inviterId !== 0) {
            toast.error("Invite information is missing.");
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        const hasInvalidPhoto = photos.some(file => !allowedTypes.includes(file.type));
        if (hasInvalidPhoto) {
            toast.error("Please use pictures with one of the following formats: jpg, png, webp, gif.");
            return;
        }

        if (photos.length === 0) {
            setShowNoPhotoConfirm(true);
            return;
        }

        await doSubmit();
    };

    const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 outline-none focus:border-[#BF003A] focus:ring-1 focus:ring-[#BF003A]/10 transition-all placeholder-gray-300 bg-white";

    return (
        <div className="min-h-screen"
            style={{
                backgroundImage: "url('/images/stepBg1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <main className="max-w-215 mx-auto px-4 sm:px-6 py-7 sm:py-9">
                <header className="py-3.5">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-2">
                            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
                            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
                        </div>
                    </Link>
                </header>

                {/* Re-submission warning */}
                {isAlreadySubmitted && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
                        <svg className="mt-0.5 shrink-0 text-amber-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <div>
                            <p className="text-[13px] font-semibold text-amber-800">You have already submitted a contribution.</p>
                            <p className="mt-0.5 text-[12px] leading-relaxed text-amber-700">
                                Submitting again will update your previous entry. Your new photos will replace the old ones.
                            </p>
                        </div>
                    </div>
                )}

                {/* Title */}
                <div className="flex items-center gap-2.5 mb-1 mt-6.25">
                    <div className="w-5 h-5 rounded bg-[#FFF0F3] border border-[#BF003A]/30 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                    </div>
                    <h1 className="text-[20px] sm:text-[22px] font-extrabold text-[#1A1A2E] tracking-tight">
                        Questionnaire <span className="uppercase">Birthday</span>
                    </h1>
                </div>
                <p className="text-[13px] text-gray-400 mb-6 ml-7.25">
                    Your contribution for{" "}
                    <span className="text-[#BF003A] font-semibold">{displaySubtitle}</span>
                </p>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* Questions card */}
                    <div className="flex-1 w-full bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-hidden">
                        {questions.length > 0 ? questions.map((q, i) => {
                            const value = answers[q.id] ?? "";
                            const filled = value.trim().length > 0;
                            return (
                                <div key={q.id} className={`px-5 py-4 ${i < questions.length - 1 ? "border-b border-gray-100" : ""}`}>
                                    {/* Label row */}
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[13px] font-semibold text-[#1A1A2E]">{q.label}</label>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                            {filled ? (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            )}
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Input */}
                                    {q.textarea ? (
                                        <textarea rows={3} value={value} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} className={`${inputClass} resize-none`} />
                                    ) : (
                                        <input value={value} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} className={inputClass} />
                                    )}
                                </div>
                            );
                        }) : (
                            <div className="px-5 py-6 text-sm text-gray-500">
                                No questions were provided for this book.
                            </div>
                        )}
                    </div>

                    {/* Photo upload card */}
                    <div className="w-full lg:w-70 xl:w-75 shrink-0 bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-5">
                        <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-1">Add photos</h2>
                        <p className="text-[12px] text-gray-400 mb-4">Upload your favorite photos, then review and submit.</p>

                        <div
                            onClick={() => photos.length < 2 && fileRef.current?.click()}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => { e.preventDefault(); void handleAddPhotos(e.dataTransfer.files); }}
                            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 px-4 mb-3 transition-all ${photos.length < 2 ? "border-gray-200 hover:border-[#BF003A]/40 cursor-pointer hover:bg-[#FFF8F9]" : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#F0EDFF] flex items-center justify-center mb-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                                </svg>
                            </div>
                            <p className="text-[12px] font-medium text-gray-600 text-center">Drop photos here or click to browse</p>
                            <p className="text-[11px] text-gray-400 mt-0.5 text-center">PNG, JPG, WEBP, GIF up to 10MB each · Max 2 photos</p>
                        </div>

                        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { if (e.target.files) void handleAddPhotos(e.target.files); }} />

                        <div className="grid grid-cols-2 gap-2">
                            {[0, 1].map(i => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                                    {photoPreviews[i] ? (
                                        <>
                                            <Image src={photoPreviews[i]} alt={`Photo ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                                            <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Submit */}
                <div className="mt-5">
                    <button
                        type="button"
                        onClick={() => void handleSubmit()}
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl text-white text-[14px] font-bold cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-70"
                        style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                    >
                        {isSubmitting ? "Submitting..." : "Submit My Contribution"}
                    </button>
                </div>

            </main>

            {/* No-Photo Confirmation Modal */}
            {showNoPhotoConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <div className="bg-white rounded-2xl w-full max-w-sm px-8 py-8 flex flex-col items-center text-center shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-full bg-[#FFF0F3] border border-[#BF003A]/30 flex items-center justify-center mb-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                        </div>
                        <h3 className="text-[17px] font-extrabold text-[#1A1A2E] mb-2">No photos added</h3>
                        <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
                            Are you sure you don&apos;t want to add any pictures?
                        </p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setShowNoPhotoConfirm(false)}
                                className="flex-1 py-3 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all"
                            >
                                No, add photos
                            </button>
                            <button
                                onClick={() => { setShowNoPhotoConfirm(false); void doSubmit(); }}
                                disabled={isSubmitting}
                                className="flex-1 py-3 rounded-xl text-white text-[13px] font-semibold cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-70"
                                style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                            >
                                {isSubmitting ? "Submitting..." : "Yes, submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Thank You Modal */}
            {showDone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <div className="bg-white rounded-2xl w-full max-w-85 px-8 py-8 flex flex-col items-center text-center shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
                        <div className="w-12 h-12 rounded-full border-2 border-[#BF003A] flex items-center justify-center mb-4">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BF003A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 className="text-[18px] font-extrabold text-[#1A1A2E] mb-1.5">Thank You !</h3>
                        <p className="text-[13px] text-gray-400 mb-6">Your contribution has been sent.</p>
                        <Link href="/" className="w-full">
                            <button
                                onClick={() => setShowDone(false)}
                                className="w-full py-3.5 rounded-xl text-white cursor-pointer text-[14px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                                style={{ background: "linear-gradient(to right, #BF003A, #59001C)" }}
                            >
                                Done
                            </button>
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}
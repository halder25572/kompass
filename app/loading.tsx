/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import {
  fetchOccasions,
  fetchBookPageStyles,
  fetchCoverPageStyles,
  fetchBooks,
  showUser,
} from "@/services/api";

// components/BookFlipLoader.tsx
// Usage:
//   <BookFlipLoader />
//   <BookFlipLoader size="lg" label="Loading..." />
//   <BookFlipLoader size="sm" label="Please wait..." className="bg-white/80" />

type Size = "sm" | "md" | "lg";

interface BookFlipLoaderProps {
  /** Size of the book icon */
  size?: Size;
  /** Optional text shown below the book */
  label?: string;
  /** Extra classes on the outer fixed overlay */
  className?: string;
}

const scaleMap: Record<Size, string> = {
  sm: "scale-[0.65]",
  md: "scale-100",
  lg: "scale-[1.45]",
};

interface LoadingState {
  occasions: boolean;
  bookPageStyles: boolean;
  coverPageStyles: boolean;
  books: boolean;
  userProfile: boolean;
}

export default function BookFlipLoader({
  size = "md",
  label,
  className = "",
}: BookFlipLoaderProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    occasions: false,
    bookPageStyles: false,
    coverPageStyles: false,
    books: false,
    userProfile: false,
  });

  const [statusMessage, setStatusMessage] = useState("Initializing...");

  // Fetch all APIs
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch Occasions
        setStatusMessage("Loading occasions...");
        setLoadingState((prev) => ({ ...prev, occasions: true }));
        await fetchOccasions().catch(() => null);
        setLoadingState((prev) => ({ ...prev, occasions: false }));

        // Fetch Book Page Styles
        setStatusMessage("Loading book page styles...");
        setLoadingState((prev) => ({ ...prev, bookPageStyles: true }));
        await fetchBookPageStyles().catch(() => null);
        setLoadingState((prev) => ({ ...prev, bookPageStyles: false }));

        // Fetch Cover Page Styles
        setStatusMessage("Loading cover page styles...");
        setLoadingState((prev) => ({ ...prev, coverPageStyles: true }));
        await fetchCoverPageStyles().catch(() => null);
        setLoadingState((prev) => ({ ...prev, coverPageStyles: false }));

        // Fetch Books
        setStatusMessage("Loading books...");
        setLoadingState((prev) => ({ ...prev, books: true }));
        await fetchBooks().catch(() => null);
        setLoadingState((prev) => ({ ...prev, books: false }));

        // Fetch User Profile
        setStatusMessage("Loading user profile...");
        setLoadingState((prev) => ({ ...prev, userProfile: true }));
        await showUser().catch(() => null);
        setLoadingState((prev) => ({ ...prev, userProfile: false }));

        setStatusMessage("Ready!");
      } catch (error) {
        console.error("Error loading data:", error);
        setStatusMessage("Loading complete");
      }
    };

    fetchAllData();
  }, []);

  const activeLoads = Object.values(loadingState).filter((v) => v).length;
  const displayLabel = activeLoads > 0 ? statusMessage : label ?? "Ready";

  return (
    <>
      <style>{`
        @keyframes bookFlip {
          0%       { transform: perspective(300px) rotateY(0deg);    }
          45%, 65% { transform: perspective(300px) rotateY(-140deg); }
          100%     { transform: perspective(300px) rotateY(0deg);    }
        }
        @keyframes labelPulse {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1;    }
        }
        @media (prefers-reduced-motion: reduce) {
          .bf-page { animation: none !important; }
          .bf-p1   { transform: perspective(300px) rotateY(-30deg); }
          .bf-p2   { transform: perspective(300px) rotateY(-20deg); }
          .bf-p3   { transform: perspective(300px) rotateY(-10deg); }
        }
      `}</style>

      {/* ── Full-screen fixed overlay, centered ── */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 ${className}`}
        role="status"
        aria-label={displayLabel ?? "Loading"}
      >
        {/* ── Book wrapper ── */}
        <div
          className="relative origin-center"
          style={{
            width: 54,
            height: 68,
            perspective: "300px",
            transform: `scale(${size === "sm" ? 0.65 : size === "lg" ? 1.45 : 1})`,
          }}
        >
          {/* Spine */}
          <div
            className="absolute bg-[#3d0011] rounded-[2px_0_0_2px]"
            style={{ left: 7, top: 0, width: 7, height: 68, zIndex: 0 }}
          />

          {/* Cover */}
          <div
            className="absolute rounded-[2px_5px_5px_2px]"
            style={{
              left: 7,
              top: 0,
              width: 40,
              height: 68,
              zIndex: 1,
              background: "linear-gradient(150deg,#BF003A,#59001C)",
            }}
          />

          {/* Page 3 — back */}
          <div
            className="bf-page bf-p3 absolute bg-[#f5e4dd]"
            style={{
              left: 14,
              top: 2,
              width: 34,
              height: 64,
              zIndex: 2,
              opacity: 0.65,
              border: "0.5px solid rgba(191,0,58,0.15)",
              borderRadius: "1px 4px 4px 1px",
              transformOrigin: "left center",
              willChange: "transform",
              animation: "bookFlip 2.2s ease-in-out 0.5s infinite",
            }}
          />

          {/* Page 2 — mid */}
          <div
            className="bf-page bf-p2 absolute bg-[#f9ede6]"
            style={{
              left: 14,
              top: 2,
              width: 34,
              height: 64,
              zIndex: 3,
              opacity: 0.85,
              border: "0.5px solid rgba(191,0,58,0.15)",
              borderRadius: "1px 4px 4px 1px",
              transformOrigin: "left center",
              willChange: "transform",
              animation: "bookFlip 2.2s ease-in-out 0.25s infinite",
            }}
          />

          {/* Page 1 — front */}
          <div
            className="bf-page bf-p1 absolute bg-[#fdf6f0]"
            style={{
              left: 14,
              top: 2,
              width: 34,
              height: 64,
              zIndex: 4,
              border: "0.5px solid rgba(191,0,58,0.15)",
              borderRadius: "1px 4px 4px 1px",
              transformOrigin: "left center",
              willChange: "transform",
              animation: "bookFlip 2.2s ease-in-out 0s infinite",
            }}
          />
        </div>

        {/* ── Optional label ── */}
        {displayLabel && (
          <p
            className="text-[13px] font-medium tracking-widest text-[#BF003A] uppercase"
            style={{ animation: "labelPulse 2.2s ease-in-out infinite" }}
            aria-hidden="true"
          >
            {displayLabel}
          </p>
        )}
      </div>
    </>
  );
}
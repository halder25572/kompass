import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(102deg, #BF003A 0%, #59001C 100%)' }}>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 -right-24 h-125 w-125 rounded-full opacity-30 blur-[80px] animate-drift-slow" style={{ background: 'radial-gradient(circle, #FF0050, transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-100 w-100 rounded-full opacity-25 blur-[80px] animate-drift-slow-reverse" style={{ background: 'radial-gradient(circle, #78001A, transparent 70%)' }} />

      {/* Decorative horizontal lines */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-white/5" />
      <div className="pointer-events-none absolute inset-x-0 top-2/3 h-px bg-white/5" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center animate-fade-up">

        {/* 404 large type */}
        <div className="flex items-end justify-center leading-none select-none mb-6" aria-hidden="true">
          <span className="font-display text-[clamp(100px,18vw,180px)] text-white/10 tracking-tight">4</span>
          <span
            className="font-display text-[clamp(100px,18vw,180px)] tracking-tight text-white"
            style={{ textShadow: '0 0 60px rgba(255,160,160,0.5), 0 0 120px rgba(255,80,80,0.25)' }}
          >
            0
          </span>
          <span className="font-display text-[clamp(100px,18vw,180px)] text-white/10 tracking-tight">4</span>
        </div>

        {/* Thin rule */}
        <div className="mb-7 h-px w-12 rounded-full bg-white/30" />

        {/* Heading */}
        <h1 className="font-sans text-[clamp(20px,4vw,34px)] font-medium tracking-tight text-white mb-3">
          Page Not Found
        </h1>

        {/* Subtext */}
        <p className="font-sans text-sm font-light leading-relaxed text-white/55 max-w-xs mb-10">
          The page you&apos;re looking for has vanished into the void.
          Let&apos;s get you back on track.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/18 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] active:translate-y-0"
        >
          {/* Shine overlay */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/12 to-transparent" />

          <HomeIcon className="relative z-10 h-4 w-4 shrink-0" />
          <span className="relative z-10">Return Home</span>
        </Link>

      </div>
    </main>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L1.5 7.293A1 1 0 0 0 2.207 9H3v5.5A.5.5 0 0 0 3.5 15H6v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 0 .5-.5V9h.793a1 1 0 0 0 .707-1.707L8.707 1.5Z" />
    </svg>
  )
}
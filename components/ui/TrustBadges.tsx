export default function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <span className="trust-badge">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1L7.5 4.5H11L8.25 6.75L9.25 10.5L6 8.25L2.75 10.5L3.75 6.75L1 4.5H4.5L6 1Z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
        </svg>
        Secure checkout
      </span>
      <span className="text-cream/10">·</span>
      <span className="trust-badge">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="4" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="0.8"/>
          <path d="M3 4V3a3 3 0 016 0v1" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
        Secure checkout
      </span>
      <span className="text-cream/10">·</span>
      <span className="trust-badge">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="1" y="1" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="0.8"/>
          <path d="M10 3.5L12 3.5L13 5.5L13 8H10V3.5Z" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="3.5" cy="8.5" r="1" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="11" cy="8.5" r="1" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
        Free shipping ₹999+
      </span>
      <span className="text-cream/10">·</span>
      <span className="trust-badge">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1L7.545 4.257L11 4.854L8.5 7.29L9.09 10.746L6 9.124L2.91 10.746L3.5 7.29L1 4.854L4.455 4.257L6 1Z" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
        Freshness guaranteed
      </span>
    </div>
  )
}

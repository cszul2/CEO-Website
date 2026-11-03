export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      {!compact && <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-white">Office of the CEO</span>}
    </div>
  )
}

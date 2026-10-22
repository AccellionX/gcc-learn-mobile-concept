export function ProgressBar({
  value,
  className = '',
  trackClassName = 'bg-cream-dark',
}: {
  value: number
  className?: string
  trackClassName?: string
}) {
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full ${trackClassName} ${className}`}
    >
      <div
        className="h-full rounded-full bg-teal transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

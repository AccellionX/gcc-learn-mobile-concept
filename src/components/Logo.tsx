import { GraduationCap } from 'lucide-react'

export function Logo({
  size = 'md',
  light = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
}) {
  const sizes = {
    sm: { icon: 18, text: 'text-base' },
    md: { icon: 24, text: 'text-xl' },
    lg: { icon: 36, text: 'text-3xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-xl ${
          light ? 'bg-white/15' : 'bg-navy'
        }`}
        style={{ width: s.icon + 14, height: s.icon + 14 }}
      >
        <GraduationCap
          size={s.icon}
          className={light ? 'text-teal' : 'text-teal'}
          strokeWidth={2}
        />
      </div>
      <span
        className={`font-semibold tracking-tight ${s.text} ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        GCC Learn
      </span>
    </div>
  )
}

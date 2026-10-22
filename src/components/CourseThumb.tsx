import {
  BadgeCheck,
  GraduationCap,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCog,
  Wallet,
  BadgeCheck,
  GraduationCap,
  TrendingUp,
}

export function CourseThumb({
  gradient,
  icon,
  size = 'md',
  badge,
}: {
  gradient: string
  icon: string
  size?: 'sm' | 'md' | 'lg'
  badge?: string
}) {
  const Icon = iconMap[icon] ?? GraduationCap
  const dims = { sm: 'h-16 w-16', md: 'h-28 w-40', lg: 'h-44 w-full' }[size]
  const iconSize = { sm: 22, md: 32, lg: 48 }[size]

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${dims} shrink-0`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -end-4 -top-4 h-24 w-24 rounded-full bg-white/30" />
        <div className="absolute -bottom-6 -start-4 h-20 w-20 rounded-full bg-black/20" />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Icon size={iconSize} className="text-white/90" strokeWidth={1.5} />
      </div>
      {badge && (
        <span className="absolute start-2 top-2 rounded-md bg-teal px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </div>
  )
}

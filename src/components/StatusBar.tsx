import { Signal, Wifi, Battery } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function StatusBar({ light = false }: { light?: boolean }) {
  const { frame } = useApp()
  const time = '9:41'
  const color = light ? 'text-white' : 'text-navy'
  const androidBg = light ? 'bg-navy' : 'bg-navy'

  if (frame === 'android') {
    return (
      <div
        className={`flex h-7 shrink-0 items-center justify-between px-4 text-[11px] font-medium text-white ${androidBg}`}
      >
        <span className="tabular-nums">{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal size={12} strokeWidth={2.5} />
          <Wifi size={12} strokeWidth={2.5} />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">100%</span>
            <Battery size={14} strokeWidth={2} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative flex h-11 shrink-0 items-end justify-between px-6 pb-1.5 text-[14px] font-semibold ${color}`}
    >
      <span className="w-16 tabular-nums">{time}</span>
      <div className="absolute left-1/2 top-2 h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex w-16 items-center justify-end gap-1">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

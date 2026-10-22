import type { ReactNode } from 'react'
import { useApp } from '../context/AppContext'

export function DeviceFrame({ children }: { children: ReactNode }) {
  const { frame, setFrame, tr } = useApp()
  const isIos = frame === 'ios'

  return (
    <div className="flex flex-col items-center">
      {/* Frame toggle — desktop only */}
      <div className="mb-5 hidden items-center gap-3 md:flex">
        <span className="text-xs font-medium uppercase tracking-wider text-white/40">
          {tr('desktopHint')}
        </span>
        <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setFrame('ios')}
            className={`btn-press rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              isIos ? 'bg-white text-navy shadow' : 'text-white/70 hover:text-white'
            }`}
          >
            {tr('frameIphone')}
          </button>
          <button
            type="button"
            onClick={() => setFrame('android')}
            className={`btn-press rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              !isIos ? 'bg-white text-navy shadow' : 'text-white/70 hover:text-white'
            }`}
          >
            {tr('frameAndroid')}
          </button>
        </div>
      </div>

      {/* Mobile: full screen under banner. Desktop: phone frame */}
      <div className="h-[calc(100dvh-3rem)] w-full md:h-auto md:w-auto">
        {/* Phone chrome — desktop only */}
        <div
          className={`relative mx-auto h-full w-full overflow-hidden bg-cream md:h-[780px] md:w-[380px] md:border-[10px] md:border-black md:shadow-2xl ${
            isIos
              ? 'md:rounded-[48px]'
              : 'md:rounded-[28px] md:border-[8px]'
          }`}
        >
          {/* Side buttons (iOS aesthetic) */}
          {isIos && (
            <>
              <div className="pointer-events-none absolute -start-[14px] top-[120px] hidden h-8 w-[3px] rounded-s bg-neutral-700 md:block" />
              <div className="pointer-events-none absolute -start-[14px] top-[170px] hidden h-14 w-[3px] rounded-s bg-neutral-700 md:block" />
              <div className="pointer-events-none absolute -start-[14px] top-[240px] hidden h-14 w-[3px] rounded-s bg-neutral-700 md:block" />
              <div className="pointer-events-none absolute -end-[14px] top-[180px] hidden h-20 w-[3px] rounded-e bg-neutral-700 md:block" />
            </>
          )}
          {/* Android camera punch */}
          {!isIos && (
            <div className="pointer-events-none absolute start-1/2 top-2 z-50 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black md:block" />
          )}

          <div className="flex h-full w-full flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}

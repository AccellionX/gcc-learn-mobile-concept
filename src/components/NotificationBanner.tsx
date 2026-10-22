import { Bell, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function NotificationBanner() {
  const { showNotification, dismissNotification, tr, lang } = useApp()

  if (!showNotification) return null

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[80] px-3 pt-12">
      <div className="pointer-events-auto animate-slide-down overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-xl backdrop-blur-xl">
        <div className="flex items-start gap-3 p-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy">
            <Bell size={18} className="text-teal" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-navy">GCC Learn</span>
              <span className="text-[10px] text-muted">
                {lang === 'ar' ? 'الآن' : 'now'}
              </span>
            </div>
            <p className="text-[13px] font-semibold leading-snug text-ink">
              {tr('notificationTitle')}
            </p>
            <p className="mt-0.5 text-[12px] text-muted">{tr('notificationBody')}</p>
          </div>
          <button
            type="button"
            onClick={dismissNotification}
            className="btn-press rounded-full p-1 text-muted hover:bg-cream"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

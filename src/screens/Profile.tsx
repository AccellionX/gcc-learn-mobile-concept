import { Bell, ChevronLeft, ChevronRight, History, LogOut, RotateCcw } from 'lucide-react'
import { LanguageToggle } from '../components/LanguageToggle'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/courses'

export function Profile() {
  const {
    tr,
    lang,
    dir,
    notificationsOn,
    setNotificationsOn,
    purchases,
    triggerNotification,
    signOut,
    frame,
  } = useApp()
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight

  const sourceLabel = (source: string) => {
    if (source === 'website-knet') return tr('sourceWebsite')
    if (source === 'play-store') return tr('sourcePlayStore')
    return tr('sourceAppStore')
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-cream pb-6 animate-fade-in">
      <header className="px-4 pt-3 pb-2">
        <h1 className="text-xl font-bold text-navy">{tr('profileTitle')}</h1>
      </header>

      <div className="px-4">
        {/* Account card */}
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-lg font-bold text-teal">
              {lang === 'ar' ? 'س' : 'S'}
            </div>
            <div>
              <p className="font-semibold text-navy">{tr('userName')}</p>
              <p className="text-xs text-muted" dir="ltr">
                sara@example.com
              </p>
              <p className="mt-0.5 text-[11px] text-muted">{tr('memberSince')}</p>
            </div>
          </div>
          <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs text-muted">
            {tr('demoNote')}
          </p>
        </div>

        {/* Settings */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
            <span className="text-sm font-medium text-navy">{tr('language')}</span>
            <LanguageToggle compact />
          </div>

          <button
            type="button"
            onClick={() => setNotificationsOn(!notificationsOn)}
            className="btn-press flex w-full items-center justify-between border-b border-border px-4 py-3.5"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-navy">
              <Bell size={18} className="text-muted" />
              {tr('notifications')}
            </span>
            <div
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notificationsOn ? 'bg-teal' : 'bg-border'
              }`}
              dir="ltr"
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all duration-200 ${
                  notificationsOn ? 'left-[22px]' : 'left-0.5'
                }`}
              />
            </div>
          </button>

          <button
            type="button"
            onClick={triggerNotification}
            className="btn-press flex w-full items-center justify-between px-4 py-3.5"
          >
            <span className="text-sm font-medium text-navy">
              {tr('previewNotification')}
            </span>
            <Chevron size={18} className="text-muted" />
          </button>
        </div>

        {/* Purchase history */}
        <h2 className="mt-5 flex items-center gap-2 text-sm font-bold text-navy">
          <History size={16} />
          {tr('purchaseHistory')}
        </h2>
        <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {purchases.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-start justify-between gap-3 px-4 py-3 ${
                i < purchases.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy line-clamp-1">
                  {lang === 'ar' ? p.titleAr : p.titleEn}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">{p.date}</p>
                <span
                  className={`mt-1 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                    p.source === 'website-knet'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-teal-soft text-teal-dark'
                  }`}
                >
                  {sourceLabel(p.source)}
                </span>
              </div>
              <span className="shrink-0 text-sm font-bold text-navy">
                {formatPrice(p.amount, lang)}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            // Demo restore — just a soft confirmation feel
            alert(
              lang === 'ar'
                ? 'تمت استعادة المشتريات (عرض تجريبي)'
                : 'Purchases restored (demo)',
            )
          }}
          className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white py-3.5 text-sm font-semibold text-navy"
        >
          <RotateCcw size={16} />
          {tr('restorePurchases')}
        </button>

        <button
          type="button"
          onClick={signOut}
          className="btn-press mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-red-600"
        >
          <LogOut size={16} />
          {tr('signOut')}
        </button>

        <p className="mt-4 text-center text-[10px] text-muted">
          {frame === 'ios' ? 'iOS' : 'Android'} · GCC Learn Concept · AccellionX
        </p>
      </div>
    </div>
  )
}

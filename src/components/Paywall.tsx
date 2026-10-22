import { Check, Sparkles, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getCourse, formatPrice } from '../data/courses'

export function Paywall() {
  const {
    paywallCourseId,
    paywallStep,
    closePaywall,
    setPaywallStep,
    selectedPlan,
    setSelectedPlan,
    frame,
    tr,
    lang,
    enroll,
    setHasAllAccess,
    addPurchase,
  } = useApp()

  if (!paywallCourseId || !paywallStep) return null

  const course = getCourse(paywallCourseId)
  if (!course) return null

  const subscribeLabel = frame === 'ios' ? tr('subscribeApple') : tr('subscribeGoogle')
  const confirmMsg = frame === 'ios' ? tr('storeConfirmApple') : tr('storeConfirmGoogle')

  const handleConfirm = () => {
    if (selectedPlan === 'allaccess') {
      setHasAllAccess(true)
      enroll(paywallCourseId, 'app')
    } else {
      enroll(paywallCourseId, 'app')
    }
    addPurchase({
      id: `p-${Date.now()}`,
      titleAr: selectedPlan === 'allaccess' ? 'اشتراك شامل' : course.titleAr,
      titleEn: selectedPlan === 'allaccess' ? 'All-access subscription' : course.titleEn,
      amount: selectedPlan === 'allaccess' ? 9 : course.priceKwd,
      source: frame === 'ios' ? 'app-store' : 'play-store',
      date: new Date().toISOString().slice(0, 10),
    })
    setPaywallStep('success')
  }

  return (
    <div className="absolute inset-0 z-[70] flex flex-col justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 animate-fade-in"
        aria-label="Close"
        onClick={closePaywall}
      />

      {paywallStep === 'choose' && (
        <div className="animate-slide-up relative rounded-t-3xl bg-white px-5 pb-8 pt-4 shadow-2xl">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy">{tr('unlockCourse')}</h3>
              <p className="mt-0.5 text-sm text-muted">{tr('choosePlan')}</p>
            </div>
            <button
              type="button"
              onClick={closePaywall}
              className="btn-press rounded-full bg-cream p-2 text-muted"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setSelectedPlan('single')}
              className={`btn-press w-full rounded-2xl border-2 p-4 text-start transition-all ${
                selectedPlan === 'single'
                  ? 'border-teal bg-teal-soft'
                  : 'border-border bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-navy">{tr('singleCourse')}</span>
                <span className="font-bold text-navy">
                  {formatPrice(course.priceKwd, lang)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{tr('singleCourseDesc')}</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan('allaccess')}
              className={`btn-press relative w-full rounded-2xl border-2 p-4 text-start transition-all ${
                selectedPlan === 'allaccess'
                  ? 'border-teal bg-teal-soft'
                  : 'border-border bg-white'
              }`}
            >
              <span className="absolute -top-2 end-4 inline-flex items-center gap-1 rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold text-white">
                <Sparkles size={10} />
                {tr('popular')}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-navy">{tr('allAccess')}</span>
                <span className="font-bold text-navy">{tr('allAccessPrice')}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{tr('allAccessDesc')}</p>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPaywallStep('confirm')}
            className="btn-press mt-5 w-full rounded-2xl bg-navy py-3.5 text-center text-[15px] font-semibold text-white shadow-lg shadow-navy/20"
          >
            {subscribeLabel}
          </button>

          <button
            type="button"
            onClick={closePaywall}
            className="btn-press mt-3 w-full py-2 text-center text-sm font-medium text-teal"
          >
            {tr('restorePurchases')}
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-muted">
            {tr('termsNote')}
          </p>
        </div>
      )}

      {paywallStep === 'confirm' && (
        <div className="animate-scale-in relative mx-4 mb-10 overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="border-b border-border px-5 py-4 text-center">
            <p className="text-xs font-medium text-muted">
              {frame === 'ios' ? 'App Store' : 'Google Play'}
            </p>
            <h3 className="mt-1 text-base font-bold text-navy">
              {tr('storeConfirmTitle')}
            </h3>
          </div>
          <div className="px-5 py-5 text-center">
            <p className="text-sm text-ink">{confirmMsg}</p>
            <p className="mt-2 text-lg font-bold text-navy">
              {selectedPlan === 'allaccess'
                ? tr('allAccessPrice')
                : formatPrice(course.priceKwd, lang)}
            </p>
            <p className="mt-1 text-xs text-muted">
              {lang === 'ar' ? course.titleAr : course.titleEn}
            </p>
          </div>
          <div className="flex border-t border-border">
            <button
              type="button"
              onClick={() => setPaywallStep('choose')}
              className="btn-press flex-1 py-3.5 text-sm font-medium text-muted"
            >
              {tr('cancel')}
            </button>
            <div className="w-px bg-border" />
            <button
              type="button"
              onClick={handleConfirm}
              className="btn-press flex-1 py-3.5 text-sm font-semibold text-teal"
            >
              {tr('confirm')}
            </button>
          </div>
        </div>
      )}

      {paywallStep === 'success' && (
        <div className="animate-scale-in relative mx-4 mb-10 overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-soft">
            <Check size={28} className="text-teal" strokeWidth={2.5} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-navy">
            {tr('purchaseSuccessTitle')}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {tr('purchaseSuccessBody')}
          </p>
          <button
            type="button"
            onClick={closePaywall}
            className="btn-press mt-5 w-full rounded-2xl bg-navy py-3.5 font-semibold text-white"
          >
            {tr('startWatching')}
          </button>
        </div>
      )}
    </div>
  )
}

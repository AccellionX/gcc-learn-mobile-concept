import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Logo } from '../components/Logo'
import { useApp } from '../context/AppContext'

export function Auth({ mode }: { mode: 'signin' | 'signup' }) {
  const { tr, setPhase, popScreen, dir } = useApp()
  const BackIcon = dir === 'rtl' ? ChevronRight : ChevronLeft

  const goBack = () => {
    popScreen()
    setPhase('onboarding')
  }

  const submit = () => {
    setPhase('app')
    popScreen()
  }

  return (
    <div className="flex h-full flex-col bg-cream animate-fade-in">
      <div className="flex items-center gap-2 px-4 pt-2">
        <button
          type="button"
          onClick={goBack}
          className="btn-press rounded-full p-2 text-navy hover:bg-white"
        >
          <BackIcon size={22} />
        </button>
        <Logo size="sm" />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-8">
        <h2 className="text-2xl font-bold text-navy">
          {mode === 'signin' ? tr('signIn') : tr('createAccount')}
        </h2>
        <p className="mt-1 text-sm text-muted">{tr('demoAccount')}</p>

        <div className="mt-8 space-y-3">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder={tr('namePlaceholder')}
              defaultValue={tr('userName')}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none focus:border-teal"
            />
          )}
          <input
            type="email"
            placeholder={tr('emailPlaceholder')}
            defaultValue="sara@example.com"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none focus:border-teal"
            dir="ltr"
          />
          <input
            type="password"
            placeholder={tr('passwordPlaceholder')}
            defaultValue="••••••••"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none focus:border-teal"
            dir="ltr"
          />
        </div>

        <button
          type="button"
          onClick={submit}
          className="btn-press mt-6 w-full rounded-2xl bg-navy py-3.5 font-semibold text-white"
        >
          {mode === 'signin' ? tr('signIn') : tr('createAccount')}
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">{tr('orContinue')}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={submit}
          className="btn-press w-full rounded-2xl border border-border bg-white py-3.5 text-sm font-semibold text-navy"
        >
          {tr('demoSignIn')}
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import {
  BookOpenCheck,
  Globe2,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { LanguageToggle } from '../components/LanguageToggle'
import { useApp } from '../context/AppContext'

const slides = [
  {
    icon: Smartphone,
    titleKey: 'onboarding1Title' as const,
    bodyKey: 'onboarding1Body' as const,
  },
  {
    icon: BookOpenCheck,
    titleKey: 'onboarding2Title' as const,
    bodyKey: 'onboarding2Body' as const,
  },
  {
    icon: Globe2,
    titleKey: 'onboarding3Title' as const,
    bodyKey: 'onboarding3Body' as const,
  },
]

export function Onboarding() {
  const { tr, setPhase, pushScreen, dir, replaceScreen } = useApp()
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const Icon = slide.icon
  const isLast = index === slides.length - 1
  const ChevronFwd = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <div className="flex h-full flex-col bg-cream animate-fade-in">
      <div className="flex items-center justify-between px-5 pt-3">
        <Logo size="sm" />
        <LanguageToggle compact />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-navy to-navy-light shadow-lg shadow-navy/20">
          <Icon size={48} className="text-teal" strokeWidth={1.5} />
        </div>
        <h2 className="text-center text-2xl font-bold leading-snug text-navy">
          {tr(slide.titleKey)}
        </h2>
        <p className="mt-3 text-center text-[15px] leading-relaxed text-muted">
          {tr(slide.bodyKey)}
        </p>
      </div>

      <div className="px-6 pb-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-teal' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        {!isLast ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIndex(slides.length - 1)}
              className="btn-press flex-1 rounded-2xl border border-border py-3.5 text-sm font-semibold text-muted"
            >
              {tr('skip')}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="btn-press flex flex-1 items-center justify-center gap-1 rounded-2xl bg-navy py-3.5 text-sm font-semibold text-white"
            >
              {tr('next')}
              <ChevronFwd size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                replaceScreen({ name: 'tabs' })
                setPhase('app')
              }}
              className="btn-press w-full rounded-2xl bg-navy py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/20"
            >
              {tr('demoSignIn')}
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setPhase('auth')
                  pushScreen({ name: 'auth', mode: 'signin' })
                }}
                className="btn-press flex-1 rounded-2xl border border-navy/20 py-3 text-sm font-semibold text-navy"
              >
                {tr('signIn')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase('auth')
                  pushScreen({ name: 'auth', mode: 'signup' })
                }}
                className="btn-press flex-1 rounded-2xl bg-teal py-3 text-sm font-semibold text-white"
              >
                {tr('createAccount')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

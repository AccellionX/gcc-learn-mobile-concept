import { useApp } from '../context/AppContext'

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, tr } = useApp()

  return (
    <div
      className={`inline-flex rounded-full bg-cream-dark p-0.5 ${
        compact ? 'text-xs' : 'text-sm'
      }`}
    >
      <button
        type="button"
        onClick={() => setLang('ar')}
        className={`btn-press rounded-full px-3 py-1.5 font-medium transition-all ${
          lang === 'ar' ? 'bg-navy text-white shadow-sm' : 'text-muted'
        }`}
      >
        {tr('arabic')}
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`btn-press rounded-full px-3 py-1.5 font-medium transition-all ${
          lang === 'en' ? 'bg-navy text-white shadow-sm' : 'text-muted'
        }`}
      >
        {tr('english')}
      </button>
    </div>
  )
}

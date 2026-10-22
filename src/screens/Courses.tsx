import { useMemo, useState } from 'react'
import { Search, Star, Clock, BookOpen } from 'lucide-react'
import { CourseThumb } from '../components/CourseThumb'
import { useApp } from '../context/AppContext'
import {
  categories,
  courses,
  formatNumber,
  formatPrice,
  type CategoryId,
} from '../data/courses'
import type { TranslationKey } from '../i18n/translations'

const catKeys: Record<CategoryId, TranslationKey> = {
  leadership: 'catLeadership',
  hr: 'catHR',
  finance: 'catFinance',
  iso: 'catISO',
  graduate: 'catGraduate',
  sales: 'catSales',
}

export function Courses() {
  const { tr, lang, pushScreen } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (filter !== 'all' && c.category !== filter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        c.titleAr.includes(query) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.instructorEn.toLowerCase().includes(q) ||
        c.instructorAr.includes(query)
      )
    })
  }, [query, filter])

  return (
    <div className="flex h-full flex-col bg-cream animate-fade-in">
      <header className="shrink-0 px-4 pt-3 pb-2">
        <h1 className="text-xl font-bold text-navy">{tr('coursesTitle')}</h1>
        <div className="relative mt-3">
          <Search
            size={18}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr('search')}
            className="w-full rounded-2xl border border-border bg-white py-3 pe-4 ps-10 text-sm outline-none focus:border-teal"
          />
        </div>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`btn-press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-navy text-white'
                : 'bg-white text-muted border border-border'
            }`}
          >
            {tr('all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`btn-press shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-navy text-white'
                  : 'bg-white text-muted border border-border'
              }`}
            >
              {tr(catKeys[cat.id])}
            </button>
          ))}
        </div>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">{tr('noResults')}</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => pushScreen({ name: 'course', courseId: c.id })}
                className="btn-press flex w-full gap-3 rounded-2xl border border-border bg-white p-2.5 text-start shadow-sm"
              >
                <CourseThumb
                  gradient={c.gradient}
                  icon={c.icon}
                  size="sm"
                  badge={c.isNew ? tr('new') : undefined}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-navy">
                    {lang === 'ar' ? c.titleAr : c.titleEn}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {lang === 'ar' ? c.instructorAr : c.instructorEn}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      {c.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} />
                      {formatNumber(c.durationHours, lang)} {tr('hours')}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen size={11} />
                      {formatNumber(c.lessonCount, lang)} {tr('lessons')}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-teal">
                    {formatPrice(c.priceKwd, lang)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { LanguageToggle } from '../components/LanguageToggle'
import { Logo } from '../components/Logo'
import { CourseThumb } from '../components/CourseThumb'
import { ProgressBar } from '../components/ProgressBar'
import { useApp } from '../context/AppContext'
import {
  categories,
  courses,
  formatPrice,
  getCourse,
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

function greetingKey(): TranslationKey {
  const h = new Date().getHours()
  if (h < 12) return 'greetingMorning'
  if (h < 17) return 'greetingAfternoon'
  return 'greetingEvening'
}

export function Home() {
  const { tr, lang, dir, pushScreen, setTab, continueCourseId, getEnrollment } =
    useApp()
  const continueCourse = getCourse(continueCourseId)
  const enrollment = getEnrollment(continueCourseId)
  const featured = courses.filter((c) => c.featured)
  const newOnes = courses.filter((c) => c.isNew)
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-cream pb-4 animate-fade-in">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-cream/95 px-4 py-3 backdrop-blur">
        <Logo size="sm" />
        <LanguageToggle compact />
      </header>

      <div className="px-4">
        <p className="text-sm text-muted">{tr(greetingKey())}</p>
        <h1 className="text-xl font-bold text-navy">{tr('userName')}</h1>

        {/* Continue learning */}
        {continueCourse && enrollment && (
          <button
            type="button"
            onClick={() => pushScreen({ name: 'course', courseId: continueCourse.id })}
            className="btn-press mt-4 w-full rounded-2xl bg-navy p-4 text-start shadow-lg shadow-navy/15"
          >
            <p className="text-xs font-medium text-teal">{tr('continueLearning')}</p>
            <h3 className="mt-1 text-[15px] font-semibold text-white">
              {lang === 'ar' ? continueCourse.titleAr : continueCourse.titleEn}
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar
                value={enrollment.progress}
                className="flex-1"
                trackClassName="bg-white/20"
              />
              <span className="text-xs font-medium text-white/80">
                {enrollment.progress}% {tr('progressOf')}
              </span>
            </div>
          </button>
        )}

        {/* Featured carousel */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-base font-bold text-navy">{tr('featuredCourses')}</h2>
          <button
            type="button"
            onClick={() => setTab('courses')}
            className="btn-press flex items-center gap-0.5 text-xs font-semibold text-teal"
          >
            {tr('seeAll')}
            <Chevron size={14} />
          </button>
        </div>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
          {featured.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pushScreen({ name: 'course', courseId: c.id })}
              className="btn-press w-[200px] shrink-0 text-start"
            >
              <CourseThumb gradient={c.gradient} icon={c.icon} size="md" />
              <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-navy">
                {lang === 'ar' ? c.titleAr : c.titleEn}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{c.rating}</span>
                <span>·</span>
                <span>{formatPrice(c.priceKwd, lang)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Categories */}
        <h2 className="mt-6 text-base font-bold text-navy">{tr('categories')}</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setTab('courses')}
              className="btn-press rounded-2xl border border-border bg-white px-2 py-3 text-center shadow-sm"
            >
              <span className="text-xs font-semibold leading-snug text-navy">
                {tr(catKeys[cat.id])}
              </span>
            </button>
          ))}
        </div>

        {/* New courses */}
        <h2 className="mt-6 text-base font-bold text-navy">{tr('newCourses')}</h2>
        <div className="mt-3 space-y-3">
          {newOnes.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pushScreen({ name: 'course', courseId: c.id })}
              className="btn-press flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-2.5 text-start shadow-sm"
            >
              <CourseThumb
                gradient={c.gradient}
                icon={c.icon}
                size="sm"
                badge={tr('new')}
              />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold text-navy">
                  {lang === 'ar' ? c.titleAr : c.titleEn}
                </h3>
                <p className="mt-0.5 text-xs text-muted">
                  {lang === 'ar' ? c.instructorAr : c.instructorEn}
                </p>
                <p className="mt-1 text-xs font-semibold text-teal">
                  {formatPrice(c.priceKwd, lang)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

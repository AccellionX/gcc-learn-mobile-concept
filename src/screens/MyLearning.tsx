import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CourseThumb } from '../components/CourseThumb'
import { ProgressBar } from '../components/ProgressBar'
import { useApp } from '../context/AppContext'
import { getCourse } from '../data/courses'

export function MyLearning() {
  const { tr, lang, dir, enrollments, pushScreen, setTab } = useApp()
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-cream pb-4 animate-fade-in">
      <header className="px-4 pt-3 pb-2">
        <h1 className="text-xl font-bold text-navy">{tr('myLearningTitle')}</h1>
        <p className="mt-0.5 text-sm text-muted">{tr('enrolledCourses')}</p>
      </header>

      <div className="px-4">
        {enrollments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted">{tr('noEnrolled')}</p>
            <button
              type="button"
              onClick={() => setTab('courses')}
              className="btn-press mt-4 rounded-2xl bg-navy px-6 py-3 text-sm font-semibold text-white"
            >
              {tr('browseCourses')}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.map((e) => {
              const course = getCourse(e.courseId)
              if (!course) return null
              return (
                <button
                  key={e.courseId}
                  type="button"
                  onClick={() => pushScreen({ name: 'course', courseId: e.courseId })}
                  className="btn-press w-full rounded-2xl border border-border bg-white p-3 text-start shadow-sm"
                >
                  <div className="flex gap-3">
                    <CourseThumb
                      gradient={course.gradient}
                      icon={course.icon}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-semibold text-navy">
                          {lang === 'ar' ? course.titleAr : course.titleEn}
                        </h3>
                        <Chevron size={18} className="mt-0.5 shrink-0 text-muted" />
                      </div>
                      {e.source === 'web' && (
                        <span className="mt-1 inline-block rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                          {tr('purchasedOnWeb')}
                        </span>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        <ProgressBar value={e.progress} className="flex-1" />
                        <span className="text-[11px] font-medium text-muted">
                          {e.progress}%
                        </span>
                      </div>
                      <span className="mt-2 inline-block text-xs font-semibold text-teal">
                        {tr('continueBtn')} →
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

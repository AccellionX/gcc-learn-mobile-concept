import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Play,
  Star,
  BookOpen,
  Users,
} from 'lucide-react'
import { CourseThumb } from '../components/CourseThumb'
import { useApp } from '../context/AppContext'
import { formatNumber, formatPrice, getCourse } from '../data/courses'

export function CourseDetail({ courseId }: { courseId: string }) {
  const {
    tr,
    lang,
    dir,
    popScreen,
    pushScreen,
    isEnrolled,
    openPaywall,
    getEnrollment,
  } = useApp()
  const course = getCourse(courseId)
  const BackIcon = dir === 'rtl' ? ChevronRight : ChevronLeft

  if (!course) {
    return (
      <div className="flex h-full items-center justify-center bg-cream">
        <button type="button" onClick={popScreen} className="text-teal">
          {tr('close')}
        </button>
      </div>
    )
  }

  const enrolled = isEnrolled(courseId)
  const enrollment = getEnrollment(courseId)

  const openLesson = (lessonId: string, free?: boolean) => {
    if (enrolled || free) {
      pushScreen({ name: 'lesson', courseId, lessonId })
    } else {
      openPaywall(courseId)
    }
  }

  return (
    <div className="relative flex h-full flex-col bg-cream animate-fade-in">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-28">
        <div className="relative">
          <CourseThumb gradient={course.gradient} icon={course.icon} size="lg" />
          <button
            type="button"
            onClick={popScreen}
            className="btn-press absolute start-3 top-3 rounded-full bg-black/35 p-2 text-white backdrop-blur"
          >
            <BackIcon size={20} />
          </button>
          {course.isNew && (
            <span className="absolute end-3 top-3 rounded-md bg-teal px-2 py-0.5 text-[11px] font-bold text-white">
              {tr('new')}
            </span>
          )}
        </div>

        <div className="px-4 pt-4">
          <h1 className="text-xl font-bold leading-snug text-navy">
            {lang === 'ar' ? course.titleAr : course.titleEn}
          </h1>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} />
              {formatNumber(course.students, lang)} {tr('students')}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {formatNumber(course.durationHours, lang)} {tr('hours')}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen size={13} />
              {formatNumber(course.lessonCount, lang)} {tr('lessons')}
            </span>
          </div>

          <h2 className="mt-5 text-sm font-bold text-navy">{tr('aboutCourse')}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {lang === 'ar' ? course.descriptionAr : course.descriptionEn}
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-teal">
              {(lang === 'ar' ? course.instructorAr : course.instructorEn)
                .split(' ')
                .slice(-1)[0]
                ?.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-muted">{tr('instructor')}</p>
              <p className="text-sm font-semibold text-navy">
                {lang === 'ar' ? course.instructorAr : course.instructorEn}
              </p>
              <p className="text-xs text-muted">
                {lang === 'ar' ? course.instructorTitleAr : course.instructorTitleEn}
              </p>
            </div>
          </div>

          <h2 className="mt-5 text-sm font-bold text-navy">{tr('curriculum')}</h2>
          <div className="mt-2 space-y-2">
            {course.lessons.map((lesson, i) => {
              const free = !!lesson.freePreview
              const done = enrollment?.completedLessons.includes(lesson.id)
              const locked = !enrolled && !free
              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => openLesson(lesson.id, free)}
                  className="btn-press flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-3 text-start"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      done
                        ? 'bg-teal-soft text-teal'
                        : locked
                          ? 'bg-cream-dark text-muted'
                          : 'bg-navy text-white'
                    }`}
                  >
                    {locked ? (
                      <Lock size={14} />
                    ) : (
                      <Play size={14} fill="currentColor" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy">
                      <span className="text-muted">{formatNumber(i + 1, lang)}. </span>
                      {lang === 'ar' ? lesson.titleAr : lesson.titleEn}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                      <span>
                        {formatNumber(lesson.durationMin, lang)} {tr('min')}
                      </span>
                      {free && !enrolled && (
                        <span className="rounded bg-teal-soft px-1.5 py-0.5 font-semibold text-teal">
                          {tr('freePreview')}
                        </span>
                      )}
                      {done && (
                        <span className="font-semibold text-teal">{tr('completed')}</span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="absolute inset-x-0 bottom-0 border-t border-border bg-white/95 px-4 py-3 backdrop-blur safe-bottom">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-bold text-navy">
              {formatPrice(course.priceKwd, lang)}
            </p>
            {enrolled && (
              <p className="text-[11px] font-medium text-teal">{tr('alreadyEnrolled')}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (enrolled) {
                const first = course.lessons[0]
                if (first) pushScreen({ name: 'lesson', courseId, lessonId: first.id })
              } else {
                openPaywall(courseId)
              }
            }}
            className="btn-press flex-1 rounded-2xl bg-navy py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-navy/15"
          >
            {enrolled ? tr('startLearning') : tr('enroll')}
          </button>
        </div>
      </div>
    </div>
  )
}

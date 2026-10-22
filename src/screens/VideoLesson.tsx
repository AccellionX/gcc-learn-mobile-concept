import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  Pause,
  Play,
  ShieldCheck,
  SkipForward,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatNumber, getCourse } from '../data/courses'

const SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]

export function VideoLesson({
  courseId,
  lessonId,
}: {
  courseId: string
  lessonId: string
}) {
  const {
    tr,
    lang,
    dir,
    popScreen,
    replaceScreen,
    isEnrolled,
    getEnrollment,
    completeLesson,
    openPaywall,
  } = useApp()

  const course = getCourse(courseId)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(1)

  const BackIcon = dir === 'rtl' ? ChevronRight : ChevronLeft
  const lesson = course?.lessons.find((l) => l.id === lessonId)
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  const nextLesson = course?.lessons[lessonIndex + 1]
  const enrollment = getEnrollment(courseId)
  const enrolled = isEnrolled(courseId)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setProgress(v.currentTime)
    const onMeta = () => setDuration(v.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      if (enrolled) completeLesson(courseId, lessonId)
    }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  }, [courseId, lessonId, enrolled, completeLesson])

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
      setProgress(0)
      setPlaying(false)
    }
  }, [lessonId])

  if (!course || !lesson) {
    return (
      <div className="flex h-full items-center justify-center bg-cream">
        <button type="button" onClick={popScreen}>
          {tr('close')}
        </button>
      </div>
    )
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }

  const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    const t = Number(e.target.value)
    v.currentTime = t
    setProgress(t)
  }

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length
    setSpeedIdx(next)
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[next]
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const goNext = () => {
    if (!nextLesson) return
    if (enrolled || nextLesson.freePreview) {
      if (enrolled) completeLesson(courseId, lessonId)
      replaceScreen({ name: 'lesson', courseId, lessonId: nextLesson.id })
    } else {
      openPaywall(courseId)
    }
  }

  return (
    <div className="flex h-full flex-col bg-navy animate-fade-in">
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          onClick={popScreen}
          className="btn-press rounded-full p-2 text-white/90"
        >
          <BackIcon size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {lang === 'ar' ? lesson.titleAr : lesson.titleEn}
          </p>
          <p className="truncate text-[11px] text-white/50">
            {lang === 'ar' ? course.titleAr : course.titleEn}
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-teal">
          <ShieldCheck size={12} />
          {tr('securedStreaming')}
        </div>
      </div>

      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={SAMPLE_VIDEO}
          className="aspect-video w-full"
          playsInline
          preload="metadata"
          onClick={togglePlay}
        />
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            className="btn-press absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg">
              <Play size={28} fill="currentColor" className="ms-0.5" />
            </span>
          </button>
        )}
      </div>

      <div className="bg-navy-light px-4 py-3">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={progress}
          onChange={scrub}
          className="w-full accent-teal"
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
          <span className="tabular-nums" dir="ltr">
            {fmt(progress)} / {fmt(duration)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleSpeed}
              className="btn-press rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white"
            >
              {SPEEDS[speedIdx]}x
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="btn-press rounded-full bg-teal p-2 text-white"
            >
              {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!nextLesson}
              className="btn-press flex items-center gap-1 rounded-md bg-white/10 px-2 py-1.5 text-[11px] font-semibold text-white disabled:opacity-40"
            >
              {tr('nextLesson')}
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto bg-cream px-4 py-3">
        <h3 className="text-sm font-bold text-navy">{tr('curriculum')}</h3>
        <div className="mt-2 space-y-1.5">
          {course.lessons.map((l, i) => {
            const active = l.id === lessonId
            const done = enrollment?.completedLessons.includes(l.id)
            const locked = !enrolled && !l.freePreview
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  if (locked) openPaywall(courseId)
                  else if (l.id === lessonId) return
                  else replaceScreen({ name: 'lesson', courseId, lessonId: l.id })
                }}
                className={`btn-press flex w-full items-center gap-3 rounded-xl p-2.5 text-start ${
                  active ? 'bg-teal-soft' : 'bg-white border border-border'
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                    done
                      ? 'bg-teal text-white'
                      : locked
                        ? 'bg-cream-dark text-muted'
                        : active
                          ? 'bg-navy text-white'
                          : 'bg-cream-dark text-navy'
                  }`}
                >
                  {done ? (
                    <Check size={14} strokeWidth={3} />
                  ) : locked ? (
                    <Lock size={12} />
                  ) : (
                    formatNumber(i + 1, lang)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy">
                    {lang === 'ar' ? l.titleAr : l.titleEn}
                  </p>
                  <p className="text-[11px] text-muted">
                    {formatNumber(l.durationMin, lang)} {tr('min')}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

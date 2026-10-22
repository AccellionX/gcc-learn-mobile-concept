import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { t, type Lang, type TranslationKey } from '../i18n/translations'
import { courses } from '../data/courses'

export type DeviceFrame = 'ios' | 'android'
export type TabId = 'home' | 'courses' | 'learning' | 'profile'
export type AppPhase = 'splash' | 'onboarding' | 'auth' | 'app'

export type Screen =
  | { name: 'tabs' }
  | { name: 'course'; courseId: string }
  | { name: 'lesson'; courseId: string; lessonId: string }
  | { name: 'auth'; mode: 'signin' | 'signup' }

export interface Enrollment {
  courseId: string
  progress: number
  completedLessons: string[]
  source: 'web' | 'app'
  purchasedAt: string
}

export interface PurchaseRecord {
  id: string
  titleAr: string
  titleEn: string
  amount: number
  source: 'website-knet' | 'app-store' | 'play-store'
  date: string
}

interface AppContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  tr: (key: TranslationKey) => string
  dir: 'rtl' | 'ltr'
  frame: DeviceFrame
  setFrame: (f: DeviceFrame) => void
  phase: AppPhase
  setPhase: (p: AppPhase) => void
  tab: TabId
  setTab: (t: TabId) => void
  screen: Screen
  pushScreen: (s: Screen) => void
  replaceScreen: (s: Screen) => void
  popScreen: () => void
  enrollments: Enrollment[]
  enroll: (courseId: string, source?: 'web' | 'app') => void
  isEnrolled: (courseId: string) => boolean
  getEnrollment: (courseId: string) => Enrollment | undefined
  completeLesson: (courseId: string, lessonId: string) => void
  hasAllAccess: boolean
  setHasAllAccess: (v: boolean) => void
  notificationsOn: boolean
  setNotificationsOn: (v: boolean) => void
  showNotification: boolean
  triggerNotification: () => void
  dismissNotification: () => void
  purchases: PurchaseRecord[]
  addPurchase: (p: PurchaseRecord) => void
  paywallCourseId: string | null
  openPaywall: (courseId: string) => void
  closePaywall: () => void
  paywallStep: 'choose' | 'confirm' | 'success' | null
  setPaywallStep: (s: 'choose' | 'confirm' | 'success' | null) => void
  selectedPlan: 'single' | 'allaccess'
  setSelectedPlan: (p: 'single' | 'allaccess') => void
  signOut: () => void
  continueCourseId: string
}

const AppContext = createContext<AppContextValue | null>(null)

const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    courseId: 'lead-essentials',
    progress: 42,
    completedLessons: ['le-1', 'le-2'],
    source: 'app',
    purchasedAt: '2025-11-12',
  },
  {
    courseId: 'hr-kuwait',
    progress: 18,
    completedLessons: ['hr-1'],
    source: 'web',
    purchasedAt: '2025-10-03',
  },
]

const INITIAL_PURCHASES: PurchaseRecord[] = [
  {
    id: 'p1',
    titleAr: 'إدارة الموارد البشرية وفق قانون العمل الكويتي',
    titleEn: 'HR Management & Kuwait Labour Law',
    amount: 18,
    source: 'website-knet',
    date: '2025-10-03',
  },
  {
    id: 'p2',
    titleAr: 'أساسيات القيادة التنفيذية',
    titleEn: 'Executive Leadership Essentials',
    amount: 15,
    source: 'app-store',
    date: '2025-11-12',
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')
  const [frame, setFrame] = useState<DeviceFrame>('ios')
  const [phase, setPhase] = useState<AppPhase>('splash')
  const [tab, setTab] = useState<TabId>('home')
  const [stack, setStack] = useState<Screen[]>([{ name: 'tabs' }])
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS)
  const [hasAllAccess, setHasAllAccess] = useState(false)
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(INITIAL_PURCHASES)
  const [paywallCourseId, setPaywallCourseId] = useState<string | null>(null)
  const [paywallStep, setPaywallStep] = useState<'choose' | 'confirm' | 'success' | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'allaccess'>('allaccess')

  const screen = stack[stack.length - 1]

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    if (phase !== 'splash') return
    const timer = setTimeout(() => setPhase('onboarding'), 1500)
    return () => clearTimeout(timer)
  }, [phase])

  const tr = useCallback((key: TranslationKey) => t(lang, key), [lang])

  const pushScreen = useCallback((s: Screen) => {
    setStack((prev) => [...prev, s])
  }, [])

  const replaceScreen = useCallback((s: Screen) => {
    setStack((prev) => [...prev.slice(0, -1), s])
  }, [])

  const popScreen = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  const isEnrolled = useCallback(
    (courseId: string) => hasAllAccess || enrollments.some((e) => e.courseId === courseId),
    [enrollments, hasAllAccess],
  )

  const getEnrollment = useCallback(
    (courseId: string) => enrollments.find((e) => e.courseId === courseId),
    [enrollments],
  )

  const enroll = useCallback((courseId: string, source: 'web' | 'app' = 'app') => {
    setEnrollments((prev) => {
      if (prev.some((e) => e.courseId === courseId)) return prev
      return [
        ...prev,
        {
          courseId,
          progress: 0,
          completedLessons: [],
          source,
          purchasedAt: new Date().toISOString().slice(0, 10),
        },
      ]
    })
  }, [])

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId !== courseId) return e
        if (e.completedLessons.includes(lessonId)) return e
        const course = courses.find((c) => c.id === courseId)
        const completed = [...e.completedLessons, lessonId]
        const progress = course
          ? Math.round((completed.length / course.lessons.length) * 100)
          : e.progress
        return { ...e, completedLessons: completed, progress }
      }),
    )
  }, [])

  const openPaywall = useCallback((courseId: string) => {
    setPaywallCourseId(courseId)
    setPaywallStep('choose')
    setSelectedPlan('allaccess')
  }, [])

  const closePaywall = useCallback(() => {
    setPaywallCourseId(null)
    setPaywallStep(null)
  }, [])

  const addPurchase = useCallback((p: PurchaseRecord) => {
    setPurchases((prev) => [p, ...prev])
  }, [])

  const triggerNotification = useCallback(() => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 4500)
  }, [])

  const dismissNotification = useCallback(() => setShowNotification(false), [])

  const signOut = useCallback(() => {
    setPhase('onboarding')
    setStack([{ name: 'tabs' }])
    setTab('home')
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      setLang,
      tr,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      frame,
      setFrame,
      phase,
      setPhase,
      tab,
      setTab,
      screen,
      pushScreen,
      replaceScreen,
      popScreen,
      enrollments,
      enroll,
      isEnrolled,
      getEnrollment,
      completeLesson,
      hasAllAccess,
      setHasAllAccess,
      notificationsOn,
      setNotificationsOn,
      showNotification,
      triggerNotification,
      dismissNotification,
      purchases,
      addPurchase,
      paywallCourseId,
      openPaywall,
      closePaywall,
      paywallStep,
      setPaywallStep,
      selectedPlan,
      setSelectedPlan,
      signOut,
      continueCourseId: 'lead-essentials',
    }),
    [
      lang,
      setLang,
      tr,
      frame,
      phase,
      tab,
      screen,
      pushScreen,
      replaceScreen,
      popScreen,
      enrollments,
      enroll,
      isEnrolled,
      getEnrollment,
      completeLesson,
      hasAllAccess,
      notificationsOn,
      showNotification,
      triggerNotification,
      dismissNotification,
      purchases,
      addPurchase,
      paywallCourseId,
      openPaywall,
      closePaywall,
      paywallStep,
      selectedPlan,
      signOut,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

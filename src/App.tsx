import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, Link, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Banner } from './components/Banner'
import { DeviceFrame } from './components/DeviceFrame'
import { StatusBar } from './components/StatusBar'
import { BottomNav } from './components/BottomNav'
import { NotificationBanner } from './components/NotificationBanner'
import { Paywall } from './components/Paywall'
import { Splash } from './screens/Splash'
import { Onboarding } from './screens/Onboarding'
import { Auth } from './screens/Auth'
import { Home } from './screens/Home'
import { Courses } from './screens/Courses'
import { CourseDetail } from './screens/CourseDetail'
import { VideoLesson } from './screens/VideoLesson'
import { MyLearning } from './screens/MyLearning'
import { Profile } from './screens/Profile'
import { HowWeBuild } from './screens/HowWeBuild'

function TabContent() {
  const { tab } = useApp()
  switch (tab) {
    case 'home':
      return <Home />
    case 'courses':
      return <Courses />
    case 'learning':
      return <MyLearning />
    case 'profile':
      return <Profile />
  }
}

function PhoneApp() {
  const { phase, screen, dir } = useApp()

  let content: ReactNode
  if (phase === 'splash') {
    content = <Splash />
  } else if (phase === 'onboarding' && screen.name !== 'auth') {
    content = <Onboarding />
  } else if (screen.name === 'auth') {
    content = <Auth mode={screen.mode} />
  } else if (screen.name === 'course') {
    content = <CourseDetail courseId={screen.courseId} />
  } else if (screen.name === 'lesson') {
    content = (
      <VideoLesson courseId={screen.courseId} lessonId={screen.lessonId} />
    )
  } else if (phase === 'app') {
    content = <TabContent />
  } else {
    content = <Onboarding />
  }

  const showTopStatus = screen.name !== 'lesson'
  const darkStatus = phase === 'splash'

  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden bg-cream"
      dir={dir}
    >
      {showTopStatus && <StatusBar light={darkStatus} />}

      <div className="relative min-h-0 flex-1 overflow-hidden">{content}</div>

      {phase === 'app' && screen.name === 'tabs' && <BottomNav />}
      {(phase === 'app' || screen.name === 'course' || screen.name === 'lesson') && (
        <Paywall />
      )}
      <NotificationBanner />
    </div>
  )
}

function DesktopTabs() {
  const { tr } = useApp()
  const location = useLocation()
  const onHow = location.pathname === '/how'

  return (
    <div className="mb-4 hidden items-center justify-center gap-2 md:flex">
      <Link
        to="/"
        className={`btn-press rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          !onHow
            ? 'bg-teal text-white'
            : 'bg-white/10 text-white/70 hover:text-white'
        }`}
      >
        GCC Learn
      </Link>
      <Link
        to="/how"
        className={`btn-press rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          onHow
            ? 'bg-teal text-white'
            : 'bg-white/10 text-white/70 hover:text-white'
        }`}
      >
        {tr('howWeBuild')}
      </Link>
    </div>
  )
}

function AppShell() {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[radial-gradient(ellipse_at_top,#163A5F_0%,#071524_55%,#040c18_100%)] pt-12 md:h-auto md:min-h-[100dvh] md:overflow-visible">
      <Banner />
      <div className="flex h-[calc(100dvh-3rem)] flex-col items-center justify-center px-0 py-0 md:h-auto md:min-h-[calc(100dvh-3rem)] md:px-4 md:py-6">
        <DesktopTabs />
        <DeviceFrame>
          <PhoneApp />
        </DeviceFrame>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppShell />} />
          <Route
            path="/how"
            element={
              <>
                <Banner />
                <HowWeBuild />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

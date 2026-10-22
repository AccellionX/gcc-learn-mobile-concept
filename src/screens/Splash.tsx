import { Logo } from '../components/Logo'
import { useApp } from '../context/AppContext'

export function Splash() {
  const { tr } = useApp()

  return (
    <div className="flex h-full flex-col items-center justify-center bg-navy animate-fade-in">
      <div className="animate-splash">
        <Logo size="lg" light />
      </div>
      <p className="mt-4 text-sm text-white/60">{tr('splashTagline')}</p>
      <div className="absolute bottom-16 h-1 w-24 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-teal" />
      </div>
    </div>
  )
}

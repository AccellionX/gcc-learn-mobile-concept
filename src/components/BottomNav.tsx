import { BookOpen, Home, Library, User } from 'lucide-react'
import { useApp, type TabId } from '../context/AppContext'

const tabs: { id: TabId; icon: typeof Home; labelKey: 'tabHome' | 'tabCourses' | 'tabLearning' | 'tabProfile' }[] = [
  { id: 'home', icon: Home, labelKey: 'tabHome' },
  { id: 'courses', icon: BookOpen, labelKey: 'tabCourses' },
  { id: 'learning', icon: Library, labelKey: 'tabLearning' },
  { id: 'profile', icon: User, labelKey: 'tabProfile' },
]

export function BottomNav() {
  const { tab, setTab, tr, frame } = useApp()

  const isAndroid = frame === 'android'

  return (
    <nav
      className={`safe-bottom shrink-0 border-t ${
        isAndroid
          ? 'border-border/60 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]'
          : 'border-border/80 bg-white/95 backdrop-blur-xl'
      }`}
    >
      <div className={`flex ${isAndroid ? 'h-16' : 'h-[58px]'} items-stretch`}>
        {tabs.map(({ id, icon: Icon, labelKey }) => {
          const active = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`btn-press flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? (isAndroid ? 'text-teal' : 'text-navy') : 'text-muted'
              }`}
            >
              <div className="relative">
                <Icon
                  size={isAndroid ? 24 : 22}
                  strokeWidth={active ? 2.4 : 1.8}
                  fill={active && !isAndroid ? 'currentColor' : 'none'}
                  className={active && !isAndroid ? 'opacity-90' : ''}
                />
                {isAndroid && active && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-teal" />
                )}
              </div>
              <span
                className={`text-[10px] ${
                  active ? 'font-semibold' : 'font-medium'
                }`}
              >
                {tr(labelKey)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

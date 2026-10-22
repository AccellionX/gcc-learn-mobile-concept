import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function Banner() {
  const { tr } = useApp()
  const location = useLocation()
  const onHow = location.pathname === '/how'

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-3 border-b border-white/10 bg-navy/95 px-3 py-2 text-[11px] text-white/90 backdrop-blur-md sm:px-4 sm:text-xs">
      <p className="min-w-0 flex-1 truncate leading-snug">{tr('banner')}</p>
      <Link
        to={onHow ? '/' : '/how'}
        className="btn-press shrink-0 rounded-full bg-teal px-3 py-1 font-semibold text-white hover:bg-teal-dark"
      >
        {onHow ? tr('backToApp') : tr('howWeBuild')}
      </Link>
    </div>
  )
}

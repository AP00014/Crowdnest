import { useEffect, useRef, useState } from 'react'

export function useNavMenu() {
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    function syncHeight() {
      const height = Math.round(nav.getBoundingClientRect().height)
      document.documentElement.style.setProperty('--site-nav-height', `${height}px`)
    }

    syncHeight()
    window.addEventListener('resize', syncHeight)
    window.addEventListener('orientationchange', syncHeight)
    return () => {
      window.removeEventListener('resize', syncHeight)
      window.removeEventListener('orientationchange', syncHeight)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return { navRef, open, setOpen, toggle: () => setOpen((v) => !v) }
}

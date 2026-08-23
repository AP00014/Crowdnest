import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function scrollToId(id, behavior = 'smooth') {
  if (!id) {
    window.scrollTo({ top: 0, behavior })
    return
  }

  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}

export function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''

    if (!id) {
      window.scrollTo(0, 0)
      return
    }

    let attempts = 0
    let frame = 0

    function tryScroll() {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts < 20) {
        attempts += 1
        frame = requestAnimationFrame(tryScroll)
      }
    }

    frame = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}

import { useEffect, useState } from 'react'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function useHeroSlider(slideCount, intervalMs = 5000) {
  const [order] = useState(() => shuffle(Array.from({ length: slideCount }, (_, i) => i)))
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((p) => (p + 1) % order.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [order.length, intervalMs])

  const activeIndex = order[position]
  return { activeIndex }
}

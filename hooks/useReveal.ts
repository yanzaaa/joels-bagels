import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, revealed }
}

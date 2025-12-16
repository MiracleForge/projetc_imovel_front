'use client'

import { useEffect, useState, useRef } from 'react'

export default function LazyGate({
  children,
  fallBack
}: {
  children: React.ReactNode
  fallBack?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '20px', threshold: 0 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {shouldRender ? children : fallBack}
    </div>
  )
}


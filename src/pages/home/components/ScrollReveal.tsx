import { useEffect, useRef, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  animation?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
}

export default function ScrollReveal({
  children,
  animation = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
        } else {
          element.classList.remove('is-visible')
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal reveal-${animation}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
import { useEffect, useRef } from 'react'

/**
 * Custom hook for scroll reveal animations using Intersection Observer
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - Ref to bind to element
 */
export default function useScrollReveal(options = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Mark that JS-powered reveal behavior is available.
    document.documentElement.classList.add('js-reveal')

    // Fallback: ensure element becomes visible after a short delay
    const fallbackTimer = setTimeout(() => {
      element.classList.add('active')
      element.querySelectorAll('.reveal, .reveal-title, .reveal-subtitle, .reveal-left, .reveal-right, .reveal-scale, .reveal-content, .stagger-children').forEach(node => node.classList.add('active'))
    }, 100)

    if (typeof IntersectionObserver === 'undefined') {
      clearTimeout(fallbackTimer)
      element.classList.add('active')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer)
            entry.target.classList.add('active')
            entry.target
              .querySelectorAll(
                '.reveal, .reveal-title, .reveal-subtitle, .reveal-left, .reveal-right, .reveal-scale, .reveal-content, .stagger-children'
              )
              .forEach((node) => node.classList.add('active'))
            if (options.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (!options.once) {
            entry.target.classList.remove('active')
            entry.target
              .querySelectorAll(
                '.reveal, .reveal-title, .reveal-subtitle, .reveal-left, .reveal-right, .reveal-scale, .reveal-content, .stagger-children'
              )
              .forEach((node) => node.classList.remove('active'))
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      clearTimeout(fallbackTimer)
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options.once, options.threshold, options.rootMargin])

  return { ref: elementRef }
}

/**
 * Hook for staggered children animations
 */
export function useStaggeredReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    document.documentElement.classList.add('js-reveal')

    // Fallback: ensure visible after short delay
    const fallbackTimer = setTimeout(() => {
      container.classList.add('active')
      container.querySelectorAll('.reveal, .reveal-title, .reveal-subtitle, .reveal-left, .reveal-right, .reveal-scale, .reveal-content, .stagger-children').forEach(node => node.classList.add('active'))
    }, 100)

    if (typeof IntersectionObserver === 'undefined') {
      clearTimeout(fallbackTimer)
      container.classList.add('active')
      Array.from(container.children).forEach((child) => child.classList.add('active'))
      return
    }

    const children = container.children
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer)
            entry.target.classList.add('active')
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('active')
              }, index * (options.delay || 100))
            })
            if (options.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (!options.once) {
            entry.target.classList.remove('active')
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    )

    observer.observe(container)

    return () => {
      clearTimeout(fallbackTimer)
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [options.once, options.threshold, options.rootMargin, options.delay])

  return { ref: containerRef }
}

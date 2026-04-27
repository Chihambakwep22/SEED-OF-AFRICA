import { useEffect } from 'react'

/**
 * Global Scroll Reveal Manager
 * Automatically handles all scroll reveal animations throughout the app
 */
export default function ScrollRevealManager() {
  useEffect(() => {
    // Configuration
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    }

    // Main observer for reveal classes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          // Optionally unobserve after animation
          if (entry.target.dataset.revealOnce !== 'false') {
            observer.unobserve(entry.target)
          }
        } else if (entry.target.dataset.revealOnce === 'false') {
          entry.target.classList.remove('active')
        }
      })
    }, observerOptions)

    // Elements to observe
    const revealSelectors = [
      '.reveal',
      '.reveal-left', 
      '.reveal-right',
      '.reveal-scale',
      '.stagger-children',
      '.service-section',
      '.about-section',
      '.hub-section'
    ]

    revealSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el)
      })
    })

    // Setup staggered delays for children
    const setupStaggeredDelays = () => {
      const containers = document.querySelectorAll('.stagger-children')
      containers.forEach((container) => {
        const children = container.querySelectorAll('.pillar-card, .metric-card, .case-card, .serve-card, .approach-card, .resource-card, .blog-card')
        children.forEach((child, index) => {
          child.style.transitionDelay = `${0.1 + index * 0.1}s`
        })
      })
    }

    setupStaggeredDelays()

    // Refresh on DOM changes
    const observer2 = new MutationObserver(setupStaggeredDelays)
    observer2.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      observer2.disconnect()
    }
  }, [])

  return null
}

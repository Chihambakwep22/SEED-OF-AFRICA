import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/ImpactMetrics.css'

/**
 * Animated Counter Component
 * Animates numbers counting up when they come into view
 */
function AnimatedCounter({ value, duration = 2000, startOnView = true }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnView)
  const elementRef = useRef(null)

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => observer.disconnect()
    } else {
      setIsVisible(true)
    }
  }, [startOnView])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const suffix = value.replace(/[0-9]/g, '')
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * numericValue)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  )
}

export default function ImpactMetrics() {
  const metrics = [
    {
      value: '100%',
      label: 'Scorecard Optimization',
      description: 'Zero wasted ESD capital'
    },
    {
      value: '+45%',
      label: 'SME Growth',
      description: 'Average supplier revenue increase'
    },
    {
      value: '2,500+',
      label: 'Jobs Created',
      description: 'Sustainable employment through ESD'
    },
    {
      value: '85%',
      label: 'Digital Adoption',
      description: 'Tech-enabled suppliers in network'
    }
  ]

  const sectionRef = useScrollReveal({ threshold: 0.1, once: true })

  return (
    <section className="impact-metrics">
      <div className="section-container">
        <div ref={sectionRef.ref}>
          <h2 className="section-title reveal-title">Our Impact</h2>
          <p className="section-subtitle reveal-subtitle">Real metrics from real transformations</p>

          <div className="metrics-grid stagger-children">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="metric-value">
                  <AnimatedCounter value={metric.value} duration={2500} />
                </div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

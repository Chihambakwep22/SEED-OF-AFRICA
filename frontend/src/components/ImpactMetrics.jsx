import { useState, useEffect, useRef } from 'react'
import { useStaggeredReveal } from '../hooks/useScrollReveal'
import '../styles/ImpactMetrics.css'

/**
 * Animated Counter Component (FIXED + ENHANCED)
 */
function AnimatedCounter({ value, duration = 2000, startOnView = true }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnView)
  const elementRef = useRef(null)

  // ✅ FIX: suffix is now properly scoped
  const suffix = String(value).replace(/[0-9]/g, '')

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

      if (elementRef.current) observer.observe(elementRef.current)
      return () => observer.disconnect()
    } else {
      setIsVisible(true)
    }
  }, [startOnView])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10)

    if (isNaN(numericValue)) {
      setCount(0)
      return
    }

    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
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

/**
 * Main Impact Metrics Dashboard (AI + Live Updates)
 */
export default function ImpactMetrics() {
  // 📊 AI-Driven KPI Metrics (simulated live data)
  const [metrics, setMetrics] = useState([
    { value: '100%', label: 'Scorecard Optimization', description: 'Zero wasted ESD capital' },
    { value: '+45%', label: 'SME Growth', description: 'Average supplier revenue increase' },
    { value: '2,500+', label: 'Jobs Created', description: 'Sustainable employment through ESD' },
    { value: '85%', label: 'Digital Adoption', description: 'Tech-enabled suppliers in network' }
  ])

  const sectionRef = useStaggeredReveal({ threshold: 0.1, once: true })

  /**
   * 🤖 Simulated AI Live Metrics Updates
   * (Replace this later with Django API / WebSocket)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.label === 'SME Growth') {
            const base = 45 + Math.floor(Math.random() * 5)
            return { ...m, value: `+${base}%` }
          }

          if (m.label === 'Jobs Created') {
            const base = 2500 + Math.floor(Math.random() * 50)
            return { ...m, value: `${base}+` }
          }

          return m
        })
      )
    }, 6000) // updates every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="impact-metrics">
      <div className="section-container">

        <div ref={sectionRef.ref} className="stagger-children">

          {/* 🔥 Title */}
          <h2 className="section-title reveal-title">
            🔥 Our AI-Powered Impact Dashboard
          </h2>

          <p className="section-subtitle reveal-subtitle">
            📊 Real-time ESD performance metrics powered by intelligent analytics
          </p>

          {/* 📊 KPI GRID */}
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">

                {/* Icon */}
                <div className="metric-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Animated Value */}
                <div className="metric-value">
                  <AnimatedCounter
                    value={metric.value}
                    duration={2500}
                  />
                </div>

                {/* Label */}
                <div className="metric-label">
                  {metric.label}
                </div>

                {/* Description */}
                <div className="metric-description">
                  {metric.description}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
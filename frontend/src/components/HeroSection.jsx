import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/HeroSection.css'

export default function HeroSection() {
  const heroTitle = useScrollReveal({ threshold: 0.3 })
  const heroSubtitle = useScrollReveal({ threshold: 0.3, delay: 200 })
  const heroButtons = useScrollReveal({ threshold: 0.3, delay: 400 })

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge reveal-badge">AI-Powered ESD Platform</div>
        <h1 ref={heroTitle.ref} className="hero-title reveal-title">
          AI-Powered Enterprise & Supplier Development
        </h1>
        <p ref={heroSubtitle.ref} className="hero-subtitle reveal-subtitle">
          We help enterprises and entrepreneurs build measurable capability through analytics,
          mentorship, financial literacy, and practical digital tools.
        </p>
        <div ref={heroButtons.ref} className="hero-buttons reveal-buttons">
          <Link to="/contact" className="btn btn-primary btn-lg btn-glow">
            Book a Strategy Call
          </Link>
          <button className="btn btn-outline btn-lg">
            Explore Solutions
          </button>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

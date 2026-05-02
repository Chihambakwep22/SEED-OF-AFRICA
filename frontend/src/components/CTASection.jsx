import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import '../styles/CTASection.css'

export default function CTASection() {
  const contentRef = useScrollReveal({ threshold: 0.2, once: true })

  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-pattern"></div>
        <div className="cta-glow-orb orb-1"></div>
        <div className="cta-glow-orb orb-2"></div>
      </div>
      
      <div className="cta-container">
        <div ref={contentRef.ref} className="cta-content">
          <div className="cta-icon-wrapper">
            <span className="cta-icon blue-circle-icon" aria-hidden="true"></span>
            <div className="cta-icon-ring"></div>
          </div>
          
          <h2 className="cta-title">
            Ready to build a resilient growth ecosystem?
          </h2>
          
          <p className="cta-text">
            Partner with a team focused on business capability, operational clarity, and measurable
            impact.
          </p>
          
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary btn-xl btn-glow pulse-slow">
              Book Consultation
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>

          <div className="cta-features">
            <span className="feature-tag">No Commitment</span>
            <span className="feature-tag">Free Strategy Call</span>
            <span className="feature-tag">AI Readiness Assessment</span>
          </div>
        </div>
      </div>
    </section>
  )
}

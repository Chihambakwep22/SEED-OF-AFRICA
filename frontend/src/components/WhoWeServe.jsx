import { Link } from 'react-router-dom'
import { useStaggeredReveal } from '../hooks/useScrollReveal'
import '../styles/WhoWeServe.css'

export default function WhoWeServe() {
  const containerRef = useStaggeredReveal({ threshold: 0.1, once: true })

  return (
    <section className="who-we-serve">
      <div className="section-container">
        <div ref={containerRef.ref} className="stagger-children">
          <h2 className="section-title reveal-title">Who We Serve</h2>
          <p className="section-intro reveal-subtitle">
            Transforming enterprises and entrepreneurs into a high-performance ecosystem
          </p>

          <div className="service-cards">
            <div className="serve-card">
              <div className="card-header">
                <span className="card-icon blue-circle-icon" aria-hidden="true"></span>
                <h3>For Enterprises</h3>
              </div>
              <p>Strategic partners seeking to transform ESD from compliance burden into competitive advantage. Optimized ESD spend with measurable ROI, tech-enabled supplier networks, and real-time impact dashboards.</p>
              <Link to="/for-enterprises" className="btn btn-secondary btn-arrow">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="serve-card">
              <div className="card-header">
                <span className="card-icon blue-circle-icon" aria-hidden="true"></span>
                <h3>For Entrepreneurs</h3>
              </div>
              <p>Ambitious business owners ready to scale with AI-powered tools and world-class mentorship. AI-driven acceleration programs, strategic mentorship & coaching, and NQF-aligned certifications.</p>
              <Link to="/for-entrepreneurs" className="btn btn-secondary btn-arrow">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

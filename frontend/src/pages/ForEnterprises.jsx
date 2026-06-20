import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/ForEnterprises.css'

export default function ForEnterprises() {
  const sectionsRef = useRef([])
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleScheduleSession = () => {
    navigate(user ? '/contact' : '/login')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="for-enterprises">
      <section className="page-hero">
        <h1>For Enterprises</h1>
        <p>Build a measurable enterprise and supplier development strategy that supports growth</p>
      </section>

      <section ref={(el) => (sectionsRef.current[0] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon blue-circle-icon" aria-hidden="true"></div>
          <h2>AI-Enhanced ESD Strategy & Compliance</h2>
          <p className="card-subtitle">Move from passive compliance to active competitive advantage</p>
          <p className="card-description"><strong>Predictive Scorecard Optimization:</strong> Data-driven modelling ensures 100% ESD spend absorption with zero wasted capital. <strong>Bespoke Tech-Forward Design:</strong> Programs that modernize SMEs, ensuring your suppliers are technologically advanced. <strong>Intelligent Regulatory Guidance:</strong> Real-time navigation of Codes of Good Practice with proactive policy analysis.</p>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[1] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon blue-circle-icon" aria-hidden="true"></div>
          <h2>Intelligent Supplier Scouting & Vetting</h2>
          <p className="card-subtitle">Building a Future-Proof supply chain</p>
          <p className="card-description"><strong>Precision Due Diligence:</strong> Analyse operational scalability and digital readiness of every supplier. <strong>Market-Ready Database:</strong> Access curated black-owned businesses vetted for quality, compliance, and technological agility. <strong>Strategic Gap Identification:</strong> AI-driven diagnostics pinpoint where suppliers are falling behind with actionable roadmaps.</p>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[2] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon blue-circle-icon" aria-hidden="true"></div>
          <h2>High-Fidelity M&E and Impact Reporting</h2>
          <p className="card-subtitle">Radical transparency and measurable ROI</p>
          <p className="card-description"><strong>Live Impact Dashboards:</strong> Real-time data on investment performance without waiting for year-end reports. <strong>Beyond the Spend:</strong> Track deep value including revenue growth in Rands, digital adoption rates, and job creation. <strong>Success Stories 2.0:</strong> Data-backed case studies proving how intervention transforms suppliers into high-tech partners.</p>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[3] = el)} className="cta-section">
        <h2>Ready to Transform Your Supply Chain?</h2>
        <button className="btn btn-primary btn-xl" onClick={handleScheduleSession}>Schedule a Strategy Session</button>
      </section>
    </div>
  )
}

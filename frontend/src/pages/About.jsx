import { useEffect, useRef } from 'react'
import '../styles/About.css'

export default function About() {
  const sectionsRef = useRef([])

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
    <div className="about">
      <section className="page-hero">
        <h1>About Thale-Quants</h1>
        <p>Disrupting Enterprise & Supplier Development with AI</p>
      </section>

      <section ref={(el) => (sectionsRef.current[0] = el)} className="about-section">
        <h2>Our Mission</h2>
        <p>
          To transform traditional Enterprise and Supplier Development (ESD) by merging strategic 
          mentorship with cutting-edge artificial intelligence, creating tech-enabled supply chains 
          that drive sustainable growth across Africa.
        </p>
      </section>

      <section ref={(el) => (sectionsRef.current[1] = el)} className="about-section">
        <h2>Our Approach</h2>
        <div className="approach-grid">
          <div className="approach-card">
            <h3>🎯 Strategic Alignment</h3>
            <p>We align ESD initiatives with your business objectives, moving beyond compliance to competitive advantage.</p>
          </div>
          <div className="approach-card">
            <h3>🤖 AI-Powered Solutions</h3>
            <p>Leveraging AI for predictive analytics, supplier scouting, and performance optimization.</p>
          </div>
          <div className="approach-card">
            <h3>👥 Expert Mentorship</h3>
            <p>Access to industry veterans who understand both business and technology transformation.</p>
          </div>
          <div className="approach-card">
            <h3>📊 Data-Driven Results</h3>
            <p>Real-time dashboards and transparent reporting for measurable impact and ROI.</p>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[2] = el)} className="about-section">
        <h2>Why Choose Thale-Quants?</h2>
        <ul className="benefits-list">
          <li>We don't just comply; we create competitive advantage</li>
          <li>AI-enhanced processes for maximum efficiency and ROI</li>
          <li>Proven track record transforming suppliers into tech-enabled partners</li>
          <li>End-to-end support from strategy to execution and measurement</li>
          <li>Deep expertise in South African regulatory environment and market dynamics</li>
        </ul>
      </section>

      <section ref={(el) => (sectionsRef.current[3] = el)} className="about-section team-section">
        <h2>Our Team</h2>
        <p>Led by experienced professionals in ESD, AI, and supply chain development with a shared passion for transforming African businesses.</p>
      </section>
    </div>
  )
}

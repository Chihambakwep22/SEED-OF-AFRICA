import { useEffect, useRef } from 'react'
import '../styles/ForEntrepreneurs.css'

export default function ForEntrepreneurs() {
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
    <div className="for-entrepreneurs">
      <section className="page-hero">
        <h1>For Entrepreneurs</h1>
        <p>Get a 10-year head start using today's AI technology</p>
      </section>

      <section ref={(el) => (sectionsRef.current[0] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon">🚀</div>
          <h2>AI-Driven Incubation & Acceleration</h2>
          <p className="card-subtitle">Give yourself a 10-year head start using today's technology</p>
          <ul className="features-list">
            <li>
              <strong>AI-Fundamentals Program:</strong> Master business through our Entrepreneur Fundamentals Learner Workbook with AI tools to automate operations
            </li>
            <li>
              <strong>Dynamic Business Model Canvas:</strong> Build a living strategy that uses AI to analyse market trends and customer segments in real-time
            </li>
            <li>
              <strong>Smart Operational Excellence:</strong> Implement AI-powered systems and SOPs enabling small teams to produce large-scale output
            </li>
          </ul>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[1] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon">👥</div>
          <h2>Virtual Strategic Mentorship</h2>
          <p className="card-subtitle">High-level wisdom delivered anywhere</p>
          <ul className="features-list">
            <li>
              <strong>1-on-1 Precision Coaching:</strong> Virtual sessions focused on strategy, change management (ADKAR), and scaling complexities
            </li>
            <li>
              <strong>Disruptive Leadership:</strong> Transform from owner-operator to tech-forward CEO
            </li>
            <li>
              <strong>Personalized Growth Path:</strong> Custom roadmaps aligned with your business goals and market opportunities
            </li>
          </ul>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[2] = el)} className="service-section">
        <div className="service-card">
          <div className="card-icon">📚</div>
          <h2>Masterclasses: The AI Advantage</h2>
          <p className="card-subtitle">Skills that make you un-ignorable</p>
          <ul className="features-list">
            <li>
              <strong>AI for Business Series:</strong> Practical training on AI for financial mastery, automated marketing, and operational efficiency
            </li>
            <li>
              <strong>NQF-Aligned Certification:</strong> Formal recognition at NQF Level 4 or 5 combined with cutting-edge digital skills
            </li>
            <li>
              <strong>Thale-Quants Credential:</strong> Certificate proving you're a tech-enabled partner, not just a supplier
            </li>
          </ul>
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[3] = el)} className="cta-section">
        <h2>Ready to Transform Your Business?</h2>
        <button className="btn btn-primary btn-xl">Get Started with AI Training</button>
      </section>
    </div>
  )
}

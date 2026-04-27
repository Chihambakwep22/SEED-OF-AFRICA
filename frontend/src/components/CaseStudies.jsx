import { useStaggeredReveal } from '../hooks/useScrollReveal'
import '../styles/CaseStudies.css'

export default function CaseStudies() {
  const cases = [
    {
      id: 1,
      company: 'TechSupply Solutions',
      challenge: 'Manufacturing supplier struggling with legacy systems',
      solution: 'AI-powered operational excellence program',
      result: '3x output capacity in 18 months',
      roi: '+250% Revenue Growth',
      icon: '🏭'
    },
    {
      id: 2,
      company: 'GrowTech Logistics',
      challenge: 'Limited digital capabilities affecting supply chain',
      solution: 'Smart systems implementation & mentorship',
      result: 'Became preferred corporate partner',
      roi: '+180% Contract Value',
      icon: '🚚'
    },
    {
      id: 3,
      company: 'Innovation Manufacturers',
      challenge: 'Compliance burden limiting growth',
      solution: 'Strategic ESD optimization',
      result: '500+ jobs created in 2 years',
      roi: '+320% Market Expansion',
      icon: '⚙️'
    }
  ]

  const containerRef = useStaggeredReveal({ threshold: 0.1, once: true })

  return (
    <section className="case-studies">
      <div className="section-container">
        <div ref={containerRef.ref} className="stagger-children">
          <h2 className="section-title reveal-title">Success Stories</h2>
          <p className="section-subtitle reveal-subtitle">How we transformed suppliers into market leaders</p>

          <div className="cases-grid">
            {cases.map(caseStudy => (
              <div key={caseStudy.id} className="case-card">
                <div className="case-header">
                  <span className="case-icon">{caseStudy.icon}</span>
                  <h3>{caseStudy.company}</h3>
                </div>
                
                <div className="case-section">
                  <div className="section-label">
                    <span className="label-icon">🎯</span>
                    <strong>Challenge</strong>
                  </div>
                  <p>{caseStudy.challenge}</p>
                </div>

                <div className="case-section">
                  <div className="section-label">
                    <span className="label-icon">✨</span>
                    <strong>Solution</strong>
                  </div>
                  <p>{caseStudy.solution}</p>
                </div>

                <div className="case-result">
                  <div className="result-item">
                    <span className="result-label">Result:</span>
                    <span className="result-value">{caseStudy.result}</span>
                  </div>
                  <div className="roi-badge">
                    <span className="roi-icon">📈</span>
                    <span className="roi-value">{caseStudy.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
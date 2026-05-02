import { useStaggeredReveal } from '../hooks/useScrollReveal'
import '../styles/CaseStudies.css'

export default function CaseStudies() {
  const cases = [
    {
      id: 1,
      company: 'Sasol',
      initials: 'S',
      sector: 'Energy & Chemicals',
      challenge: 'Supplier onboarding and data reporting needed a more streamlined process.',
      solution: 'Designed a supplier analytics and compliance workflow for small vendors.',
      result: 'Clearer visibility across supplier readiness and faster reporting cycles.',
      roi: 'Supplier enablement focus'
    },
    {
      id: 2,
      company: 'Shoprite Group',
      initials: 'SG',
      sector: 'Retail & Distribution',
      challenge: 'Retail supply partners needed stronger business fundamentals and inventory discipline.',
      solution: 'Rolled out a practical training and dashboard model for SME suppliers.',
      result: 'Improved stock reliability and stronger trading readiness.',
      roi: 'Retail supplier growth'
    },
    {
      id: 3,
      company: 'Standard Bank',
      initials: 'SB',
      sector: 'Financial Services',
      challenge: 'Early-stage SMEs needed stronger cash-flow planning and digital adoption.',
      solution: 'Delivered financial literacy, business intelligence, and AI-for-business workshops.',
      result: 'Better planning, tighter operations, and improved decision visibility.',
      roi: 'Financial capability uplift'
    }
  ]

  const containerRef = useStaggeredReveal({ threshold: 0.1, once: true })

  return (
    <section className="case-studies">
      <div className="section-container">
        <div ref={containerRef.ref} className="stagger-children">
          <h2 className="section-title reveal-title">Success Stories</h2>
          <p className="section-subtitle reveal-subtitle">Representative case studies showing measurable business impact</p>

          <div className="cases-grid">
            {cases.map(caseStudy => (
              <div key={caseStudy.id} className="case-card">
                <div className="case-header">
                  <span className="company-logo" aria-hidden="true">{caseStudy.initials}</span>
                  <div className="case-heading-group">
                    <h3>{caseStudy.company}</h3>
                    <p className="case-sector">{caseStudy.sector}</p>
                  </div>
                </div>
                
                <div className="case-section">
                  <div className="section-label">
                    <span className="label-icon blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
                    <strong>Challenge</strong>
                  </div>
                  <p>{caseStudy.challenge}</p>
                </div>

                <div className="case-section">
                  <div className="section-label">
                    <span className="label-icon blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
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
                    <span className="roi-icon blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
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
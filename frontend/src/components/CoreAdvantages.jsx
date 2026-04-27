import { useStaggeredReveal } from '../hooks/useScrollReveal'
import '../styles/CoreAdvantages.css'

export default function CoreAdvantages() {
  const pillars = [
    {
      icon: '🤖',
      title: 'AI Strategy',
      description: 'Data-driven intelligence powering predictive scorecard optimization and supplier analytics'
    },
    {
      icon: '🔗',
      title: 'Smart Supply Chains',
      description: 'Tech-enabled ecosystems connecting enterprises with future-ready suppliers'
    },
    {
      icon: '📊',
      title: 'Real Impact Data',
      description: 'Live dashboards tracking revenue growth, job creation, and sustainable outcomes'
    }
  ]

  const containerRef = useStaggeredReveal({ threshold: 0.1, once: true })

  return (
    <section className="core-advantages">
      <div className="section-container">
        <div ref={containerRef.ref}>
          <h2 className="section-title reveal-title">Your Core Advantage</h2>
          <p className="section-subtitle reveal-subtitle">Three pillars powering the future of ESD</p>

          <div className="pillars-grid stagger-children">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon-wrapper">
                  <div className="pillar-icon-bg"></div>
                  <span className="pillar-icon">{pillar.icon}</span>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

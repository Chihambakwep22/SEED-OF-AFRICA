import { useEffect, useRef } from 'react'
import '../styles/KnowledgeHub.css'

export default function KnowledgeHub() {
  const templates = [
    { id: 1, title: 'Business Plan Framework', description: 'AI-ready template for comprehensive business planning', format: 'PDF + Excel' },
    { id: 2, title: 'Cash Flow Forecasting', description: 'Automated spreadsheet in Rands (R)', format: 'Excel' },
    { id: 3, title: 'Financial Dashboard', description: 'Real-time financial tracking tools', format: 'Excel' },
    { id: 4, title: 'Market Analysis Template', description: 'Structured approach to market research', format: 'PDF' },
  ]

  const webinars = [
    { id: 1, title: 'AI Fundamentals for Business Owners', date: '2024-05-15', duration: '60 mins' },
    { id: 2, title: 'Building Tech-Enabled Supply Chains', date: '2024-05-22', duration: '90 mins' },
    { id: 3, title: 'Financial Mastery with AI Tools', date: '2024-05-29', duration: '75 mins' },
    { id: 4, title: 'Digital Marketing Automation', date: '2024-06-05', duration: '60 mins' },
  ]

  const blogPosts = [
    { id: 1, title: 'How AI is Disrupting ESD in South Africa', excerpt: 'Exploring the transformation of supplier development...', date: '2024-05-10' },
    { id: 2, title: 'The Future of Black Economic Empowerment', excerpt: 'Tech-enabled BEE is reshaping corporate strategy...', date: '2024-05-05' },
    { id: 3, title: '5 Ways to Scale Your Business with AI', excerpt: 'Practical insights on operational excellence...', date: '2024-04-30' },
    { id: 4, title: 'Compliance vs. Competitive Advantage', excerpt: 'Moving beyond minimum requirements...', date: '2024-04-25' },
  ]

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
    <div className="knowledge-hub">
      <section className="page-hero">
        <h1>Knowledge Hub</h1>
        <p>Your Digital Toolkit for Success</p>
      </section>

      <section ref={(el) => (sectionsRef.current[0] = el)} className="hub-section">
        <h2>📋 Smart Templates</h2>
        <p className="section-description">AI-ready frameworks and automated tools to accelerate your growth</p>
        <div className="resources-grid">
          {templates.map(template => (
            <div key={template.id} className="resource-card">
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <span className="resource-format">{template.format}</span>
              <button className="btn btn-secondary btn-small">Download</button>
            </div>
          ))}
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[1] = el)} className="hub-section">
        <h2>🎥 Innovation Webinars</h2>
        <p className="section-description">Recorded sessions on ESD, LED, and emerging technology</p>
        <div className="resources-grid">
          {webinars.map(webinar => (
            <div key={webinar.id} className="resource-card">
              <h3>{webinar.title}</h3>
              <div className="webinar-meta">
                <span className="date">{webinar.date}</span>
                <span className="duration">{webinar.duration}</span>
              </div>
              <button className="btn btn-secondary btn-small">Watch Now</button>
            </div>
          ))}
        </div>
      </section>

      <section ref={(el) => (sectionsRef.current[2] = el)} className="hub-section">
        <h2>📝 The Disruption Blog</h2>
        <p className="section-description">Insights on AI, ESD, and the future of South African business</p>
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

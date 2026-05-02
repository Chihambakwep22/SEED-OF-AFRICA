import { useState, useEffect, useRef } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'enterprise',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceType: 'enterprise',
          message: ''
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="contact">
      <section className="page-hero">
        <h1>Get In Touch</h1>
        <p>Let's discuss how ThaleQuants can support your growth strategy</p>
      </section>

      <section className="contact-section">
        <div ref={containerRef} className="contact-container">
          <div className="contact-info reveal-left">
            <h2>Contact Information</h2>
            <div className="info-item">
              <h3>Location</h3>
              <ul className="location-list">
                <li>Gauteng</li>
                <li>Limpopo</li>
                <li>KwaZulu-Natal</li>
              </ul>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p>info.thalequants@gmail.com</p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>+27 (0) 11 XXX XXXX</p>
            </div>
            <div className="info-item">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 5:00 PM (SAST)</p>
            </div>
          </div>

          <form className="contact-form reveal-right" onSubmit={handleSubmit}>
            <h2>Book Your Strategy Session</h2>
            
            {submitted && (
              <div className="success-message">
                <span className="blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
                Thank you! We'll be in touch soon.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="serviceType">Service Type *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="enterprise">Enterprise Solutions</option>
                <option value="entrepreneur">Entrepreneur Program</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-xl">
              Schedule Consultation
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

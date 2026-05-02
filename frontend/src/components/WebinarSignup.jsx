import { useState } from 'react'
import '../styles/WebinarSignup.css'

const webinarTopics = [
  'Data Analytics',
  'Financial Literacy',
  'SME Business Growth',
  'Digital Transformation',
  'Business Intelligence',
  'AI for Business',
  'Entrepreneurship',
  'Financial Management',
  'Technology for SMEs',
]

export default function WebinarSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: webinarTopics[0],
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: webinarTopics[0],
    })

    window.setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="webinar-signup">
      <div className="webinar-signup-container">
        <div className="webinar-copy">
          <div className="webinar-kicker">
            <span className="blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
            Webinar Registration
          </div>
          <h2>Register for practical business webinars</h2>
          <p>
            Join focused sessions on analytics, literacy, growth, and technology so your team can
            make better business decisions.
          </p>
          <ul className="webinar-points">
            <li className="icon-list-item">Live sessions led by business-focused facilitators</li>
            <li className="icon-list-item">Actionable topics designed for SMEs and enterprises</li>
            <li className="icon-list-item">Confirmation delivered immediately after signup</li>
          </ul>
        </div>

        <form className="webinar-form" onSubmit={handleSubmit}>
          <h3>Webinar Signup</h3>

          {submitted && (
            <div className="webinar-success">
              <span className="blue-circle-icon blue-circle-icon--sm" aria-hidden="true"></span>
              Registration received. We’ll send the webinar details soon.
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="webinar-name">Name</label>
              <input
                id="webinar-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="webinar-email">Email</label>
              <input
                id="webinar-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="webinar-phone">Phone number</label>
              <input
                id="webinar-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="webinar-topic">Topic</label>
              <select id="webinar-topic" name="topic" value={formData.topic} onChange={handleChange}>
                {webinarTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-xl webinar-submit">
            Submit Registration
          </button>
        </form>
      </div>
    </section>
  )
}
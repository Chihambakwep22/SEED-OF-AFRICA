import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-pattern"></div>
      </div>
      
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🌱</span>
            <h3>Thale-Quants</h3>
          </div>
          <p>AI-Powered Enterprise & Supplier Development for the Future of Africa</p>
          <div className="footer-tagline">
            Transforming compliance into competitive advantage
          </div>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/for-enterprises">For Enterprises</Link></li>
            <li><Link to="/for-entrepreneurs">For Entrepreneurs</Link></li>
            <li><Link to="/knowledge-hub">Knowledge Hub</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#"> whitepapers</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <p>Stay updated with our latest insights and offerings</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FiFacebook size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
            <a href="mailto:hello@thale-quants.co.za" className="social-icon" aria-label="Email">
              <FiMail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Thale-Quants. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

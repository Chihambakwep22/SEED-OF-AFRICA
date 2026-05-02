import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-badge" aria-hidden="true">TQ</span>
          <span className="logo-text">Thale-Quants</span>
        </Link>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/for-enterprises" className="nav-link" onClick={closeMenu}>
              <span>For Enterprises</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/for-entrepreneurs" className="nav-link" onClick={closeMenu}>
              <span>For Entrepreneurs</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/knowledge-hub" className="nav-link" onClick={closeMenu}>
              <span>Knowledge Hub</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              <span>About Us</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link nav-cta" onClick={closeMenu}>
              <span>Book Consultation</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

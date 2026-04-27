import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ForEnterprises from './pages/ForEnterprises'
import ForEntrepreneurs from './pages/ForEntrepreneurs'
import KnowledgeHub from './pages/KnowledgeHub'
import About from './pages/About'
import Contact from './pages/Contact'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <div
          style={{
            position: 'fixed',
            bottom: '12px',
            right: '12px',
            background: '#111827',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            zIndex: 9999,
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}
        >
          APP LIVE
        </div>
        <Navbar />
        <main className="main-content" style={{ paddingTop: '70px', minHeight: '100vh', background: '#f9fafb' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/for-enterprises" element={<ForEnterprises />} />
            <Route path="/for-entrepreneurs" element={<ForEntrepreneurs />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

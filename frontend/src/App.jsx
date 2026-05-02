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
        <div className="wave-background" aria-hidden="true">
          <svg className="wave-svg wave-svg-main" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradientA" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3f63ff" />
                <stop offset="55%" stopColor="#5b4dcf" />
                <stop offset="100%" stopColor="#7f1d3f" />
              </linearGradient>
            </defs>
            <path d="M-100,560 C180,440 300,320 540,360 C760,390 900,260 1240,140" />
            <path d="M-120,520 C190,400 320,300 560,330 C760,360 930,230 1260,120" />
            <path d="M-110,490 C220,360 360,280 600,305 C820,335 980,205 1270,96" />
            <path d="M-90,470 C250,335 390,255 640,280 C860,305 1020,185 1280,86" />
            <path d="M-80,448 C280,308 420,236 680,252 C910,270 1060,165 1290,74" />
            <path d="M-50,430 C300,292 460,220 730,228 C940,235 1100,150 1300,62" />
            <path d="M-20,412 C340,270 520,205 770,200 C980,194 1120,130 1300,48" />
            <path d="M-30,430 C360,280 540,215 780,210 C990,204 1130,140 1310,56" />
            <path d="M-40,450 C380,295 560,225 790,220 C1000,214 1140,150 1320,64" />
            <path d="M-60,470 C400,310 580,240 800,235 C1010,228 1150,165 1330,72" />
          </svg>

          <svg className="wave-svg wave-svg-soft" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradientB" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4b7cff" />
                <stop offset="50%" stopColor="#6158c8" />
                <stop offset="100%" stopColor="#8f2b4f" />
              </linearGradient>
            </defs>
            <path d="M-140,560 C100,470 320,330 520,360 C740,394 890,300 1260,170" />
            <path d="M-160,530 C130,430 360,300 550,330 C760,360 930,265 1270,150" />
            <path d="M-170,500 C170,390 390,275 590,300 C800,325 950,235 1290,130" />
            <path d="M-150,470 C210,352 450,250 640,266 C840,286 980,210 1300,112" />
            <path d="M-170,495 C230,372 470,272 670,288 C870,308 1010,235 1310,134" />
            <path d="M-190,520 C260,395 500,295 700,310 C900,325 1040,255 1320,152" />
          </svg>
        </div>
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
        <main className="main-content" style={{ paddingTop: '70px', minHeight: '100vh' }}>
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

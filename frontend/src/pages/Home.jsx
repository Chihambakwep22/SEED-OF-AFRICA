import HeroSection from '../components/HeroSection'
import WhoWeServe from '../components/WhoWeServe'
import CoreAdvantages from '../components/CoreAdvantages'
import ImpactMetrics from '../components/ImpactMetrics'
import CaseStudies from '../components/CaseStudies'
import WebinarSignup from '../components/WebinarSignup'
import CTASection from '../components/CTASection'
import '../styles/Home.css'

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <WhoWeServe />
      <CoreAdvantages />
      <ImpactMetrics />
      <CaseStudies />
      <WebinarSignup />
      <CTASection />
    </div>
  )
}

import HeroSection from './components/HeroSection'
import StatisticsSection from './components/StatisticsSection'
import ServicesSection from './components/ServicesSection'
import TransparencySection from './components/TransparencySection'
import BeneficiariesSection from './components/BeneficiariesSection'
import HowItWorksSection from './components/HowItWorksSection'
import CTASection from './components/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <TransparencySection />
      <BeneficiariesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
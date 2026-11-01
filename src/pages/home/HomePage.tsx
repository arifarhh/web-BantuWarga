import HeroSection from './components/HeroSection'
import StatisticsSection from './components/StatisticsSection'
import ServicesSection from './components/ServicesSection'
import TransparencySection from './components/TransparencySection'
import BeneficiariesSection from './components/BeneficiariesSection'
import HowItWorksSection from './components/HowItWorksSection'
import CTASection from './components/CTASection'
import ScrollReveal from './components/ScrollReveal'

export default function HomePage() {
  return (
    <>
      <ScrollReveal animation="up">
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal animation="up" delay={100}>
        <StatisticsSection />
      </ScrollReveal>

      <ScrollReveal animation="up">
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal animation="scale">
        <TransparencySection />
      </ScrollReveal>

      <ScrollReveal animation="up">
        <BeneficiariesSection />
      </ScrollReveal>

      <ScrollReveal animation="up">
        <HowItWorksSection />
      </ScrollReveal>

      <ScrollReveal animation="up">
        <CTASection />
      </ScrollReveal>
    </>
  )
}
import HeroSection from './components/HeroSection'
import StatisticsSection from './components/StatisticsSection'
import ServicesSection from './components/ServicesSection'
import TransparencySection from './components/TransparencySection'
import BeneficiariesSection from './components/BeneficiariesSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <TransparencySection />
      <BeneficiariesSection />

      <section
        id="cara-kerja"
        className="scroll-mt-24 py-20"
      >
        {/* Cara Kerja */}
      </section>

      <section id="usul-warga" className="scroll-mt-24">
        {/* CTA */}
      </section>
    </>
  )
}
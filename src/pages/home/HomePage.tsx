import HeroSection from './components/HeroSection'
import StatisticsSection from './components/StatisticsSection'
import ServicesSection from './components/ServicesSection'
import TransparencySection from './components/TransparencySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <TransparencySection />

      <section
        id="data-penerima"
        className="scroll-mt-24 py-20"
      >
        {/* Beneficiaries Preview */}
      </section>

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
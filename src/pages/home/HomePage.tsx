
import HeroSection from './components/HeroSection'
import StatisticsSection from './components/StatisticsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <StatisticsSection />

      <section id="layanan" className="scroll-mt-24 py-20">
        {/* Services Section akan dibuat berikutnya */}
      </section>

      <section
        id="transparansi"
        className="scroll-mt-24 bg-[#F3F7F5] py-20"
      >
        {/* Transparency Preview akan dibuat berikutnya */}
      </section>

      <section id="data-penerima" className="scroll-mt-24 py-20">
        {/* Beneficiaries Preview akan dibuat berikutnya */}
      </section>

      <section id="cara-kerja" className="scroll-mt-24 py-20">
        {/* Cara Kerja akan dibuat berikutnya */}
      </section>

      <section id="usul-warga" className="scroll-mt-24">
        {/* CTA Section akan dibuat berikutnya */}
      </section>
    </>
  )
}
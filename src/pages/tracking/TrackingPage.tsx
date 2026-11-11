import { TrackingHero } from './components/TrackingHero'
import { TicketLookupForm } from './components/TicketLookupForm'
import { TrackingSteps } from './components/TrackingSteps'

export default function TrackingPage() {
  return (
    <>
      <TrackingHero />

      <section className="bg-[var(--background)] py-10 sm:py-14">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <TicketLookupForm />
            <TrackingSteps />
          </div>

          <p className="mx-auto mt-6 max-w-5xl text-center text-xs leading-5 text-[var(--muted)]">
            Informasi pada halaman ini tidak menentukan kelayakan penerima
            bantuan. Keputusan tetap menjadi kewenangan instansi terkait.
          </p>
        </div>
      </section>
    </>
  )
}

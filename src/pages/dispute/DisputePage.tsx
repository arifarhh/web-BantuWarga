import { DisputeHero } from './components/DisputeHero'
import { DisputeGuidelines } from './components/DisputeGuidelines'
import { DisputeForm } from './components/DisputeForm'

export default function DisputePage() {
  return (
    <>
      <DisputeHero />
      <DisputeGuidelines />
      <section className="bg-[var(--background)] py-10 sm:py-14">
        <div className="container max-w-5xl">
          <DisputeForm />
        </div>
      </section>
    </>
  )
}

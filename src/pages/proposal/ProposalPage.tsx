import ProposalHero from './components/ProposalHero'
import ProposalForm from './components/ProposalForm'

export default function ProposalPage() {
  return (
    <>
      <ProposalHero />

      <section className="bg-[var(--background)] py-10 md:py-14">
        <div className="container max-w-5xl">
          <ProposalForm />
        </div>
      </section>
    </>
  )
}
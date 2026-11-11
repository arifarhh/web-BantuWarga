import { HeartHandshake } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="bg-[var(--green-light)] py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-[var(--teal)]">
            <HeartHandshake size={16} />
            TENTANG BANTUWARGA
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-5xl">
            Ruang warga untuk menyampaikan dan memantau pengajuan.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text)] sm:text-base">
            BantuWarga memfasilitasi penyampaian usulan dan sanggahan terkait
            bantuan sosial, serta membantu warga mengikuti tahapan
            pengajuannya.
          </p>
        </div>
      </div>
    </section>
  )
}

import { BookOpenCheck } from 'lucide-react'

export function GuideHero() {
  return (
    <section className="bg-[var(--green-light)] py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-[var(--teal)]">
            <BookOpenCheck size={16} />
            PANDUAN &amp; INFORMASI
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-5xl">
            Kenali layanan BantuWarga dengan mudah.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text)] sm:text-base">
            Temukan langkah untuk menyampaikan usulan bantuan sosial dan
            memantau perkembangannya melalui nomor tiket.
          </p>
        </div>
      </div>
    </section>
  )
}

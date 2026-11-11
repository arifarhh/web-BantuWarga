import { TicketCheck } from 'lucide-react'

export function TrackingHero() {
  return (
    <section className="bg-[var(--green-light)] py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-[var(--teal)]">
            <TicketCheck size={16} />
            LAYANAN LACAK TIKET
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-5xl">
            Pantau perkembangan pengajuan Anda.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text)] sm:text-base">
            Masukkan nomor tiket yang Anda terima setelah mengirim usulan atau
            laporan untuk mengetahui proses tindak lanjutnya.
          </p>
        </div>
      </div>
    </section>
  )
}

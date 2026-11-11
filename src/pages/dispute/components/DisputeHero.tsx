import { MessageSquareWarning } from 'lucide-react'

export function DisputeHero() {
  return (
    <section className="bg-[#FBF1E2] py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-wide text-[#9A6B2F]">
            <MessageSquareWarning size={16} />
            LAYANAN SANGGAH WARGA
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-5xl">
            Temukan ketidaksesuaian? Sampaikan informasi dengan bertanggung jawab.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text)] sm:text-base">
            Sampaikan sanggahan berdasarkan kondisi yang Anda ketahui agar
            dapat menjadi bahan pemeriksaan oleh pihak berwenang.
          </p>
        </div>
      </div>
    </section>
  )
}

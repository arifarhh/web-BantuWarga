import { FileSearch, MapPin, ShieldCheck } from 'lucide-react'

const guidelines = [
  {
    title: 'Sampaikan fakta',
    description:
      'Jelaskan ketidaksesuaian secara spesifik dan berdasarkan informasi yang Anda ketahui.',
    icon: FileSearch,
  },
  {
    title: 'Jelaskan konteks',
    description:
      'Cantumkan wilayah kejadian dan keterangan yang membantu petugas memahami laporan.',
    icon: MapPin,
  },
  {
    title: 'Jaga privasi',
    description:
      'Jangan mencantumkan NIK, kata sandi, atau data pribadi sensitif di kolom keterangan.',
    icon: ShieldCheck,
  },
]

export function DisputeGuidelines() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <p className="text-xs font-bold tracking-wide text-[var(--teal)]">
              Sebelum menyampaikan sanggahan
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
              Informasi yang jelas membantu proses pemeriksaan.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {guidelines.map((guideline) => {
              const Icon = guideline.icon

              return (
                <article
                  key={guideline.title}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBF1E2] text-[#9A6B2F]">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold text-[var(--navy)]">
                    {guideline.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text)]">
                    {guideline.description}
                  </p>
                </article>
              )
            })}
          </div>

          <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
            Sanggahan bukan penetapan bahwa seseorang tidak layak menerima
            bantuan. Verifikasi dan keputusan tetap menjadi kewenangan instansi
            terkait.
          </p>
        </div>
      </div>
    </section>
  )
}

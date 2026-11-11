import { CheckCircle2, ShieldCheck, Waypoints } from 'lucide-react'

const principles = [
  {
    title: 'Partisipasi',
    description:
      'Warga dapat menyampaikan informasi melalui layanan pengajuan yang tersedia.',
    icon: Waypoints,
  },
  {
    title: 'Keterlacakan',
    description:
      'Nomor tiket membantu warga merujuk pengajuan dan melihat tahapan prosesnya.',
    icon: CheckCircle2,
  },
  {
    title: 'Perlindungan informasi',
    description:
      'Warga diimbau menjaga data pribadi dan hanya menyampaikan informasi yang diperlukan.',
    icon: ShieldCheck,
  },
]

export function AboutPrinciples() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7 max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[var(--teal)]">
              Prinsip layanan
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)] sm:text-3xl">
              Proses yang jelas dan bertanggung jawab.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon

              return (
                <article
                  key={principle.title}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--line)] p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--teal)]">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-[var(--navy)]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text)]">
                      {principle.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="mt-6 text-xs leading-5 text-[var(--muted)]">
            BantuWarga memfasilitasi penyampaian informasi dan pemantauan.
            Kelayakan serta penetapan penerima bantuan ditentukan oleh instansi
            pemerintah yang berwenang.
          </p>
        </div>
      </div>
    </section>
  )
}

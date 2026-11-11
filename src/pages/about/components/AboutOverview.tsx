import { ArrowRight, ClipboardList, Eye, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Sampaikan pengajuan',
    description:
      'Gunakan layanan yang tersedia untuk menyampaikan usulan bantuan sosial dengan informasi pendukung.',
    icon: ClipboardList,
  },
  {
    title: 'Ikuti perkembangannya',
    description:
      'Simpan nomor tiket pengajuan dan gunakan untuk memantau tahapan tindak lanjut.',
    icon: Eye,
  },
  {
    title: 'Dorong partisipasi warga',
    description:
      'Sampaikan informasi yang relevan agar dapat diperiksa dan ditindaklanjuti oleh pihak berwenang.',
    icon: UsersRound,
  },
]

export function AboutOverview() {
  return (
    <section className="bg-[var(--background)] py-10 sm:py-14">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-wide text-[var(--teal)]">
              Tentang layanan
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)] sm:text-3xl">
              Informasi yang tersampaikan, proses yang dapat dipantau.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text)]">
              BantuWarga menjadi sarana untuk menyampaikan informasi dan
              melihat tahapan pengajuan. Pemeriksaan, verifikasi, serta
              keputusan penerima bantuan tetap menjadi kewenangan instansi
              terkait.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--teal)]">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-[var(--navy)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text)]">
                    {service.description}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[var(--dark-teal)] p-5 text-white sm:flex-row sm:items-center sm:p-7">
            <div>
              <h2 className="text-lg font-extrabold sm:text-xl">
                Ingin tahu cara menggunakan layanan?
              </h2>
              <p className="mt-1 text-sm leading-6 text-white/75">
                Baca langkah pengajuan dan informasi yang perlu disiapkan.
              </p>
            </div>
            <Link
              to="/panduan"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--mint)] px-5 py-3 text-sm font-bold text-[var(--dark-teal)] transition hover:bg-white"
            >
              Buka Panduan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

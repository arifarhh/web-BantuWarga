
import {
  ArrowRight,
  ClipboardList,
  TicketCheck,
  FileSearch,
  Building2,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Sampaikan Pengajuan',
    description:
      'Warga mengirimkan usulan penerima bantuan atau sanggahan melalui layanan yang tersedia.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Terima Nomor Tiket',
    description:
      'Setiap pengajuan tercatat dan memperoleh nomor tiket untuk memudahkan pemantauan.',
    icon: TicketCheck,
  },
  {
    number: '03',
    title: 'Pemeriksaan Administratif',
    description:
      'Admin memeriksa kelengkapan informasi sebelum pengajuan diteruskan untuk ditindaklanjuti.',
    icon: FileSearch,
  },
  {
    number: '04',
    title: 'Tindak Lanjut Instansi',
    description:
      'Instansi berwenang melakukan verifikasi dan menentukan tindak lanjut sesuai ketentuan.',
    icon: Building2,
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="scroll-mt-24 overflow-hidden bg-[#F3F7F5] py-20 sm:py-24"
    >
      <div className="container">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold tracking-wide text-[var(--teal)]">
            Alur Layanan
          </p>

          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-4xl">
            Dari pengajuan hingga tindak lanjut.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--text)] sm:text-base">
            BantuWarga memfasilitasi penyampaian informasi dan pemantauan
            pengajuan melalui tahapan yang terstruktur dan transparan.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className={`how-step how-step-${index + 1} relative`}
              >
                <div className="group h-full rounded-2xl border border-[#E1EAE3] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#BBD6C3] hover:shadow-[0_16px_35px_rgba(23,60,81,0.08)]">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--teal)] transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <span className="text-3xl font-extrabold tracking-tight text-[#DCE9DF]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--navy)] sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">
                    {step.description}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-[#8BBB92] lg:block">
                    <ArrowRight size={19} strokeWidth={1.8} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Tracking CTA */}
        <div className="how-tracking-cta mt-7 flex flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-[var(--dark-teal)] p-6 text-white sm:p-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-semibold tracking-wide text-[#A8D2B5]">
              Pantau Pengajuan
            </p>

            <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              Ingin mengetahui perkembangan pengajuan?
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/75">
              Masukkan nomor tiket untuk melihat status dan perkembangan
              pengajuan melalui BantuWarga.
            </p>
          </div>

          <Link
            to="/tracking"
            style={{ color: '#092328' }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#D7EBE0] px-6 py-3 text-sm font-extrabold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            <span style={{ color: '#092328' }}>Lacak Pengajuan</span>
            <ArrowUpRight size={17} color="#092328" />
          </Link>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-[var(--muted)]">
          Keputusan terkait kelayakan dan penetapan penerima bantuan tetap
          menjadi kewenangan instansi pemerintah terkait.
        </p>
      </div>
    </section>
  )
}
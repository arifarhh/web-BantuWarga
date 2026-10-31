
import {
  ArrowUpRight,
  FilePlus2,
  MessageSquareWarning,
  SearchCheck,
  ChartNoAxesCombined,
  ShieldCheck,
} from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Usul Warga',
    description:
      'Usulkan diri sendiri atau warga sekitar yang dinilai layak menerima bantuan sosial dengan menyertakan informasi dan bukti pendukung.',
    label: 'Pengajuan bantuan',
    href: '#usul-warga',
    icon: FilePlus2,
    iconStyle: 'bg-[#E8F3EA] text-[#4F8B68]',
  },
  {
    number: '02',
    title: 'Sanggah Warga',
    description:
      'Sampaikan keberatan terhadap data penerima bantuan yang dinilai tidak sesuai dengan kondisi sebenarnya.',
    label: 'Pengawasan publik',
    href: '#sanggah-warga',
    icon: MessageSquareWarning,
    iconStyle: 'bg-[#FBF1E2] text-[#C28B3F]',
  },
  {
    number: '03',
    title: 'Lacak Layanan',
    description:
      'Pantau perkembangan pengajuan dan laporan secara bertahap mulai dari verifikasi hingga keputusan.',
    label: 'Pelacakan laporan',
    href: '#lacak-tiket',
    icon: SearchCheck,
    iconStyle: 'bg-[#E8F1F6] text-[#5C829D]',
  },
  {
    number: '04',
    title: 'Open Data',
    description:
      'Akses informasi penerima, anggaran, dan realisasi bantuan sosial sebagai bentuk transparansi publik.',
    label: 'Informasi publik',
    href: '#transparansi',
    icon: ChartNoAxesCombined,
    iconStyle: 'bg-[#EDEBFA] text-[#8173B7]',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="layanan"
      className="scroll-mt-24 bg-white py-20 sm:py-24"
    >
      <div className="container">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--green-light)] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--green-dark)]">
            <ShieldCheck size={13} />
            Partisipasi masyarakat
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-4xl">
            Satu platform,
            <span className="text-[#609875]"> berbagai layanan.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[510px] text-sm leading-7 text-[var(--text)]">
            Berpartisipasi dalam pengawasan bantuan sosial melalui layanan
            yang mudah diakses, transparan, dan dapat dipantau.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <a
                key={service.number}
                href={service.href}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B8D8C1] hover:shadow-[var(--shadow)]"
              >
                {/* Card number */}
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.iconStyle}`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>

                  <span className="font-mono text-[10px] font-medium tracking-wider text-[#AAB6BC]">
                    {service.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="mt-7">
                  <h3 className="text-lg font-extrabold tracking-tight text-[var(--navy)] transition group-hover:text-[var(--green-dark)]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[var(--text)]">
                    {service.description}
                  </p>
                </div>

                {/* Card footer */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-6">
                  <span className="rounded-md bg-[#F3F7F5] px-2.5 py-1.5 text-[9px] font-bold text-[var(--muted)]">
                    {service.label}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--navy)] transition group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                {/* Decorative hover accent */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--green)] transition-all duration-300 group-hover:w-full" />
              </a>
            )
          })}
        </div>

        {/* Supporting information */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <ShieldCheck size={15} className="text-[var(--green)]" />
          <p className="text-[10px] leading-5 text-[var(--muted)]">
            Setiap laporan diproses melalui tahapan verifikasi untuk menjaga
            akuntabilitas dan ketepatan data.
          </p>
        </div>
      </div>
    </section>
  )
}
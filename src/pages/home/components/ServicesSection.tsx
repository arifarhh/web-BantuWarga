
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FilePlus2,
  MessageSquareWarning,
  SearchCheck,
  ChartNoAxesCombined,
} from 'lucide-react'

const services = [
  {
    title: 'Usul Warga',
    description:
      'Sampaikan usulan data diri sendiri atau warga lain yang dinilai layak menerima bantuan sosial, disertai informasi pendukung.',
    icon: FilePlus2,
    iconStyle: 'bg-[#E8F3EA] text-[#4F8B68]',
    href: '/proposal',
  },
  {
    title: 'Sanggah Warga',
    description:
      'Laporkan ketidaksesuaian data penerima bantuan sosial berdasarkan kondisi yang ditemukan di lingkungan sekitar.',
    icon: MessageSquareWarning,
    iconStyle: 'bg-[#FBF1E2] text-[#C28B3F]',
    href: '/dispute',
  },
  {
    title: 'Lacak Tiket',
    description:
      'Periksa perkembangan usulan atau laporan melalui nomor tiket dan pantau tahapan tindak lanjutnya.',
    icon: SearchCheck,
    iconStyle: 'bg-[#E8F1F6] text-[#5C829D]',
    href: '/tracking',
  },
  {
    title: 'Open Data',
    description:
      'Lihat ringkasan informasi bantuan sosial, anggaran, dan penyaluran dalam bentuk data agregat yang mudah dipahami.',
    icon: ChartNoAxesCombined,
    iconStyle: 'bg-[#EDEBFA] text-[#8173B7]',
    href: '#transparansi',
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
        <div className="mx-auto mb-12 max-w-[620px] text-center sm:mb-14">
          <p className="mb-4 text-xs font-bold tracking-wide text-[var(--teal)]">
            Layanan BantuWarga
          </p>

          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-4xl">
            Satu platform untuk
            <span className="text-[var(--green)]"> berbagai kebutuhan.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[510px] text-sm leading-7 text-[var(--text)]">
            Gunakan layanan BantuWarga untuk menyampaikan usulan,
            melaporkan ketidaksesuaian, dan mengakses informasi bantuan sosial.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon

            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.iconStyle}`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>

                  <span className="text-xs font-semibold text-[#AAB6BC]">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-bold tracking-tight text-[var(--navy)] transition-colors duration-300 group-hover:text-[var(--green)]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[var(--text)]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-end pt-7">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--navy)] transition-all duration-300 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </>
            )

            const cardClass =
              'group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B8D8C1] hover:shadow-[0_16px_35px_rgba(23,60,81,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] focus-visible:ring-offset-2 sm:p-6'

            return service.href.startsWith('#') ? (
              <a
                key={service.title}
                href={service.href}
                className={cardClass}
              >
                {cardContent}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--green)] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={service.title}
                to={service.href}
                className={cardClass}
              >
                {cardContent}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--green)] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
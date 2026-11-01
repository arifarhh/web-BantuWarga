
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FilePlus2,
  MessageSquareWarning,
} from 'lucide-react'

const services = [
  {
    title: 'Usul Warga',
    description:
      'Sampaikan usulan bagi diri sendiri atau warga lain yang dinilai membutuhkan bantuan sosial.',
    action: 'Ajukan Usulan',
    path: '/proposal',
    icon: FilePlus2,
    variant: 'light',
  },
  {
    title: 'Sanggah Warga',
    description:
      'Laporkan ketidaksesuaian informasi penerima bantuan agar dapat ditindaklanjuti.',
    action: 'Sampaikan Sanggahan',
    path: '/dispute',
    icon: MessageSquareWarning,
    variant: 'dark',
  },
]

export default function CTASection() {
  return (
    <section
      id="usul-warga"
      className="scroll-mt-24 bg-white px-5 py-20 sm:py-24 md:px-8"
    >
      <div className="container">
        <div className="cta-panel relative overflow-hidden rounded-3xl bg-[var(--dark-teal)] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#2A835F]/20 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            {/* CTA Heading */}
            <div className="cta-content max-w-xl">
              <p className="mb-4 text-xs font-bold tracking-wide text-[#A8D2B5]">
                Partisipasi Masyarakat
              </p>

              <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Kepedulian warga membawa perubahan.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                Setiap informasi dan laporan dari masyarakat dapat membantu
                mendorong penyaluran bantuan sosial yang lebih transparan
                dan tepat sasaran.
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon
                const isLight = service.variant === 'light'

                return (
                  <Link
                    key={service.title}
                    to={service.path}
                    className={`cta-service cta-service-${index + 1} group flex min-h-[245px] flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,0.16)] ${
                      isLight
                        ? 'border-white bg-white'
                        : 'border-white/15 bg-[#173C51] hover:border-white/30 hover:bg-[#204A60]'
                    }`}
                  >
                    <div
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                        isLight
                          ? 'bg-[#E8F3EA] text-[#12544F]'
                          : 'bg-white/10 text-[#D7EBE0]'
                      }`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <h3
                      className={`text-lg font-bold ${
                        isLight ? 'text-[#092328]' : 'text-white'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`mt-2 flex-1 text-sm leading-6 ${
                        isLight ? 'text-[#536875]' : 'text-white/75'
                      }`}
                    >
                      {service.description}
                    </p>

                    <span
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3 ${
                        isLight ? 'text-[#12544F]' : 'text-[#D7EBE0]'
                      }`}
                    >
                      {service.action}
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
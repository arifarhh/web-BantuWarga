
import {
  ArrowRight,
  ClipboardList,
  FileSearch,
  MapPinned,
  ShieldCheck,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Sampaikan Pengajuan',
    description:
      'Warga mengajukan usulan penerima bantuan atau menyampaikan sanggahan melalui formulir yang tersedia.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Verifikasi Dokumen',
    description:
      'Petugas memeriksa kelengkapan dokumen dan informasi yang telah disampaikan oleh warga.',
    icon: FileSearch,
  },
  {
    number: '03',
    title: 'Survei Lapangan',
    description:
      'Petugas melakukan peninjauan kondisi lapangan untuk memastikan kesesuaian informasi.',
    icon: MapPinned,
  },
  {
    number: '04',
    title: 'Keputusan dan Informasi',
    description:
      'Hasil peninjauan dibahas dan ditetapkan. Warga dapat memantau perkembangan pengajuan.',
    icon: ShieldCheck,
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="scroll-mt-24 bg-[#F3F7F5] py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E3EFE7] px-4 py-2 text-sm font-semibold text-[var(--teal)]">
            <ShieldCheck size={16} />
            Alur Layanan
          </div>

          <h2 className="text-3xl font-bold leading-tight text-[var(--dark-teal)] md:text-4xl">
            Proses yang jelas, dari pengajuan hingga keputusan.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--text)]">
            Setiap pengajuan melalui tahapan yang terstruktur agar proses
            pemeriksaan dan tindak lanjut dapat dipantau oleh masyarakat.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="relative">
                <div className="h-full rounded-2xl border border-[#E1EAE3] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#173C51]/5">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3EA] text-[var(--teal)]">
                      <Icon size={23} />
                    </div>

                    <span className="text-3xl font-bold text-[#DCE9DF]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--dark-teal)]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">
                    {step.description}
                  </p>
                </div>

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-[#8BBB92] lg:block">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[var(--dark-teal)] p-6 text-white md:flex-row md:items-center md:p-8">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white">
              Ingin mengetahui perkembangan pengajuan?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Gunakan nomor tiket untuk melihat tahapan dan status
              pengajuan secara berkala.
            </p>
          </div>

          <a
            href="#lacak-tiket"
            className="inline-flex items-center justify-center rounded-lg
                bg-[#12544F] px-6 py-3 font-semibold text-white
                shadow-md transition-all duration-200
                hover:bg-[#2A835F] hover:shadow-lg
                hover:-translate-y-0.5"
            >
            Lacak pengajuan
        </a>
        </div>
      </div>
    </section>
  )
}
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  TicketCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const trackingSteps = [
  {
    title: 'Tiket diterima',
    description: 'Pengajuan tercatat dan mendapatkan nomor tiket.',
    icon: TicketCheck,
  },
  {
    title: 'Pemeriksaan',
    description: 'Petugas memeriksa kelengkapan informasi pengajuan.',
    icon: ClipboardCheck,
  },
  {
    title: 'Tindak lanjut',
    description: 'Instansi terkait meninjau dan menindaklanjuti pengajuan.',
    icon: CheckCircle2,
  },
]

export function TrackingSteps() {
  return (
    <aside className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F1F6] text-[#5C829D]">
          <Clock3 size={20} />
        </div>
        <h2 className="text-lg font-extrabold text-[var(--navy)]">
          Tahapan pengajuan
        </h2>
      </div>

      <ol className="mt-7 space-y-6">
        {trackingSteps.map((step, index) => {
          const Icon = step.icon

          return (
            <li key={step.title} className="flex gap-4">
              <div className="relative flex shrink-0 flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--teal)]">
                  <Icon size={18} />
                </span>
                {index < trackingSteps.length - 1 && (
                  <span className="absolute top-11 h-6 w-px bg-[var(--line)]" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-bold text-[var(--navy)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[var(--text)]">
                  {step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-7 rounded-xl border border-[var(--line)] p-4">
        <div className="flex items-center gap-2 text-[var(--teal)]">
          <CircleHelp size={17} />
          <h3 className="text-sm font-bold text-[var(--navy)]">
            Belum punya nomor tiket?
          </h3>
        </div>
        <p className="mt-2 text-xs leading-5 text-[var(--text)]">
          Ajukan usulan terlebih dahulu. Nomor tiket akan digunakan untuk
          merujuk pengajuan Anda.
        </p>
        <Link
          to="/proposal"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--green)] transition hover:text-[var(--teal)]"
        >
          Ke layanan Usul Warga
          <ArrowRight size={16} />
        </Link>
      </div>
    </aside>
  )
}

import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  LockKeyhole,
  TicketCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const guideCards = [
  {
    title: 'Siapkan informasi',
    description:
      'Sebelum mengisi usulan, siapkan data pengusul, informasi calon penerima, kondisi ekonomi, serta lokasi dan bukti pendukung.',
    icon: ClipboardList,
    tone: 'bg-[#E8F1F6] text-[#5C829D]',
  },
  {
    title: 'Kirim usulan warga',
    description:
      'Masuk ke akun BantuWarga untuk mengisi formulir usulan secara bertahap. Periksa kembali data sebelum mengirimkannya.',
    icon: FileCheck2,
    tone: 'bg-[var(--green-light)] text-[var(--green)]',
    href: '/proposal',
    action: 'Buka layanan Usul Warga',
  },
  {
    title: 'Pantau dengan nomor tiket',
    description:
      'Simpan nomor tiket setelah usulan dikirim. Gunakan nomor tersebut untuk melihat tahapan tindak lanjut pengajuan.',
    icon: TicketCheck,
    tone: 'bg-[#FBF1E2] text-[#C28B3F]',
    href: '/tracking',
    action: 'Lacak tiket',
  },
]

const steps = [
  'Buka layanan Usul Warga dan masuk ke akun jika diminta.',
  'Lengkapi informasi pengusul, calon penerima, kondisi ekonomi, serta lokasi dan bukti.',
  'Tinjau isian dan kirim usulan. Simpan nomor tiket yang diberikan.',
  'Buka Lacak Tiket dan masukkan nomor tiket untuk melihat tahapan pengajuan.',
]

export function GuideContent() {
  return (
    <section className="bg-[var(--background)] py-10 sm:py-14">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {guideCards.map((card) => {
              const Icon = card.icon

              return (
                <article
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}
                  >
                    <Icon size={21} />
                  </span>
                  <h2 className="mt-5 text-lg font-extrabold text-[var(--navy)]">
                    {card.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text)]">
                    {card.description}
                  </p>
                  {card.href && card.action && (
                    <Link
                      to={card.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--green)] transition hover:text-[var(--teal)]"
                    >
                      {card.action}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-extrabold text-[var(--navy)]">
              Alur pengajuan
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--green-light)] text-sm font-extrabold text-[var(--teal)]">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-[var(--text)]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E8F1F6] bg-white p-4 sm:p-5">
            <LockKeyhole
              size={19}
              className="mt-0.5 shrink-0 text-[var(--teal)]"
            />
            <p className="text-xs leading-5 text-[var(--text)]">
              Jaga kerahasiaan data pribadi. Gunakan informasi yang benar dan
              jangan membagikan kata sandi atau kode verifikasi kepada orang
              lain.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

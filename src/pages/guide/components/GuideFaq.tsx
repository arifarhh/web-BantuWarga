import { CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: 'Apakah saya perlu masuk untuk mengirim usulan?',
    answer:
      'Ya. Layanan Usul Warga meminta Anda masuk ke akun sebelum mengakses formulir pengajuan.',
  },
  {
    question: 'Di mana saya menemukan nomor tiket?',
    answer:
      'Nomor tiket diberikan setelah usulan dikirim. Simpan nomor tersebut agar dapat digunakan di halaman Lacak Tiket.',
  },
  {
    question: 'Apa yang diperlukan untuk melacak pengajuan?',
    answer:
      'Masukkan nomor tiket pada halaman Lacak Tiket. Jangan masukkan NIK, kata sandi, atau data pribadi lainnya di halaman tersebut.',
  },
]

export function GuideFaq() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--teal)]">
              <CircleHelp size={20} />
            </span>
            <h2 className="text-xl font-extrabold text-[var(--navy)] sm:text-2xl">
              Pertanyaan umum
            </h2>
          </div>

          <div className="space-y-3">
            {questions.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-[var(--line)] bg-white p-4 open:border-[#B8D8C1] sm:p-5"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-bold text-[var(--navy)] marker:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[var(--text)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text)]">
            Sudah memiliki nomor tiket?{' '}
            <Link
              to="/tracking"
              className="font-bold text-[var(--green)] hover:text-[var(--teal)]"
            >
              Lacak pengajuan Anda
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

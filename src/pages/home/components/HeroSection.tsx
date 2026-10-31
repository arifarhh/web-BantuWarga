
import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function HeroSection() {
  const [ticketId, setTicketId] = useState('')
  const [message, setMessage] = useState('')

  function handleTracking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!ticketId.trim()) {
      setMessage('Masukkan ID tiket terlebih dahulu.')
      return
    }

    setMessage(
      'Fitur pelacakan tiket akan tersedia pada halaman Lacak Layanan.',
    )
  }

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-[#F4F8F5] pb-16 pt-14 sm:pt-20"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#DCEDE1]/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-[#E8F3EA]/70 blur-3xl" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Hero content */}
          <div className="max-w-[570px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D1E7D6] bg-[#E8F3EA] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#43815D]">
              <Sparkles size={13} />
              Data terbuka, bantuan tepat sasaran
            </div>

            <h1 className="text-[clamp(2.6rem,5vw,4.15rem)] font-extrabold leading-[1.08] tracking-[-0.055em] text-[var(--navy)]">
              Transparansi
              <br />
              bantuan,
              <br />
              <span className="text-[#609875]">
                keadilan untuk semua.
              </span>
            </h1>

            <p className="mt-6 max-w-[470px] text-sm leading-7 text-[var(--text)] sm:text-[15px]">
              Pantau penyaluran bantuan sosial, usulkan warga yang berhak,
              dan ikut jaga akuntabilitas bersama.
            </p>

            {/* Ticket tracking form */}
            <form
              onSubmit={handleTracking}
              className="mt-7 max-w-[500px] rounded-xl border border-[var(--line)] bg-white p-2.5 shadow-[var(--shadow)]"
            >
              <label
                htmlFor="hero-ticket"
                className="mb-2 block px-2 text-[11px] font-extrabold text-[var(--navy)]"
              >
                Lacak status laporan Anda
              </label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
                  <Search
                    size={18}
                    className="shrink-0 text-[var(--muted)]"
                  />
                  <input
                    id="hero-ticket"
                    type="text"
                    value={ticketId}
                    onChange={(event) => {
                      setTicketId(event.target.value)
                      setMessage('')
                    }}
                    placeholder="Masukkan ID tiket, contoh: USL-240183"
                    className="min-w-0 flex-1 bg-transparent py-3 text-xs text-[var(--ink)] outline-none placeholder:text-[#A3B0B8]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--dark-teal)] px-5 py-3 text-xs font-bold text-white transition hover:bg-[var(--teal)]"
                >
                  Lacak tiket
                  <ArrowRight size={16} />
                </button>
              </div>

              {message && (
                <p
                  role="status"
                  className="px-2 pb-1 pt-2 text-[11px] text-[var(--text)]"
                >
                  {message}
                </p>
              )}

              <div className="mt-2 flex items-center gap-1.5 px-2 text-[10px] text-[var(--muted)]">
                <ShieldCheck size={13} />
                Data pribadi Anda terlindungi dan tidak ditampilkan ke publik.
              </div>
            </form>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[550px] lg:ml-auto">
            <div className="relative mx-auto aspect-[1.08/1] w-[82%] overflow-hidden rounded-[26px] bg-[#DCE8DF] shadow-[0_25px_65px_rgba(23,60,81,0.14)] sm:w-[78%]">
              <img
                src="https://images.unsplash.com/photo-1671080749889-19f8a69deb2b?auto=format&fit=crop&w=1200&q=85"
                alt="Lingkungan permukiman warga"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/25 via-transparent to-transparent" />
            </div>

            {/* Location chip */}
            <div className="absolute right-[9%] top-4 inline-flex items-center gap-1.5 rounded-full bg-[#173C51]/75 px-3 py-1.5 text-[9px] font-semibold text-white backdrop-blur-sm">
              <MapPin size={12} />
              Kota Sejahtera
            </div>

            {/* Accuracy card */}
            <div className="absolute -left-1 top-[17%] flex items-center gap-3 rounded-xl border border-white/80 bg-white px-3 py-3 shadow-[0_12px_35px_rgba(23,60,81,0.12)] sm:-left-3 sm:px-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--green-light)] text-[var(--green)]">
                <ShieldCheck size={19} />
              </span>
              <div>
                <strong className="block text-sm font-extrabold text-[var(--navy)]">
                  96,8%
                </strong>
                <span className="block text-[9px] text-[var(--muted)]">
                  Akurasi data penerima
                </span>
              </div>
              <span className="rounded-full bg-[var(--green-light)] px-2 py-1 text-[9px] font-bold text-[var(--green)]">
                +4,2%
              </span>
            </div>

            {/* Beneficiary card */}
            <div className="absolute -bottom-5 right-0 w-[190px] rounded-xl border border-white bg-white p-4 shadow-[0_15px_40px_rgba(23,60,81,0.15)] sm:right-1">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] text-[var(--muted)]">
                  Penerima terverifikasi
                </span>
                <Menu size={13} className="text-[var(--muted)]" />
              </div>

              <div className="flex items-baseline gap-1">
                <strong className="text-2xl font-extrabold tracking-tight text-[var(--navy)]">
                  18.642
                </strong>
                <span className="text-[9px] text-[var(--muted)]">
                  keluarga
                </span>
              </div>

              <div className="mt-3 flex h-8 items-end gap-1">
                {[35, 52, 43, 65, 57, 76, 92].map((height, index) => (
                  <span
                    key={index}
                    className={`flex-1 rounded-t-sm ${
                      index === 6 ? 'bg-[#83B995]' : 'bg-[#D8EBDF]'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Decorative check */}
            <div className="absolute -bottom-2 left-[8%] flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white text-[var(--green)] shadow-md">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
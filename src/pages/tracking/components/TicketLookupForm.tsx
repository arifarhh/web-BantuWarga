import { useState, type FormEvent } from 'react'
import { Search, ShieldCheck } from 'lucide-react'

export function TicketLookupForm() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [lookupAttempted, setLookupAttempted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!ticketNumber.trim()) return

    setLookupAttempted(true)
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--green)]">
          <Search size={22} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[var(--navy)]">
            Cari tiket pengajuan
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text)]">
            Nomor tiket dapat ditemukan pada bukti pengajuan yang diberikan
            setelah formulir dikirim.
          </p>
        </div>
      </div>

      <form className="mt-7" onSubmit={handleSubmit}>
        <label
          htmlFor="ticket-number"
          className="mb-2 block text-sm font-bold text-[var(--navy)]"
        >
          Nomor tiket
        </label>
        <input
          id="ticket-number"
          name="ticketNumber"
          type="text"
          value={ticketNumber}
          onChange={(event) => {
            setTicketNumber(event.target.value)
            setLookupAttempted(false)
          }}
          placeholder="Masukkan nomor tiket"
          autoComplete="off"
          required
          className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/15"
        />
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--dark-teal)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)] focus-visible:ring-offset-2 sm:w-auto"
        >
          <Search size={17} />
          Lacak pengajuan
        </button>
      </form>

      {lookupAttempted && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
        >
          Pencarian belum dapat dilakukan karena halaman ini belum terhubung
          ke layanan data tiket. Status pengajuan belum dapat diverifikasi.
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F3F7F5] p-4">
        <ShieldCheck
          size={19}
          className="mt-0.5 shrink-0 text-[var(--teal)]"
        />
        <p className="text-xs leading-5 text-[var(--text)]">
          Demi keamanan, cukup masukkan nomor tiket. Jangan kirim NIK, kata
          sandi, atau data pribadi melalui halaman ini.
        </p>
      </div>
    </div>
  )
}

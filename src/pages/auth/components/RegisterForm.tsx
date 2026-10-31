import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserRound, CreditCard, Phone, ArrowRight, RefreshCw } from 'lucide-react'
import type { FormEvent } from 'react'

export default function RegisterForm() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [nik, setNik] = useState('')
  const [phone, setPhone] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaNumbers] = useState(() => ({
    first: Math.floor(Math.random() * 8) + 1,
    second: Math.floor(Math.random() * 8) + 1,
  }))
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nik.length !== 16) {
      setError('NIK harus terdiri dari 16 digit.')
      return
    }

    if (!/^08\d{8,13}$/.test(phone)) {
      setError('Masukkan nomor HP yang valid, diawali 08.')
      return
    }

    if (Number(captchaAnswer) !== captchaNumbers.first + captchaNumbers.second) {
      setError('Jawaban CAPTCHA belum benar.')
      return
    }

    setError('')

    navigate('/verify-otp', {
      state: {
        name,
        phone,
        flow: 'register',
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-xs font-bold text-[var(--navy)]">
          Nama Lengkap
        </label>
        <div className="flex items-center rounded-lg border border-[var(--line)] px-3 focus-within:border-[var(--green)]">
          <UserRound size={17} className="text-[var(--muted)]" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-[var(--navy)]">
          Nomor Induk Kependudukan (NIK)
        </label>
        <div className="flex items-center rounded-lg border border-[var(--line)] px-3 focus-within:border-[var(--green)]">
          <CreditCard size={17} className="text-[var(--muted)]" />
          <input
            type="text"
            inputMode="numeric"
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="Masukkan 16 digit NIK"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            maxLength={16}
            required
          />
        </div>
        <p className="mt-1 text-[10px] text-[var(--muted)]">
          NIK digunakan untuk kebutuhan verifikasi identitas dan tidak ditampilkan secara publik.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-[var(--navy)]">
          Nomor HP
        </label>
        <div className="flex items-center rounded-lg border border-[var(--line)] px-3 focus-within:border-[var(--green)]">
          <Phone size={17} className="text-[var(--muted)]" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))}
            placeholder="Contoh: 081234567890"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            required
          />
        </div>
      </div>

      <div className="rounded-lg border border-[var(--line)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold text-[var(--navy)]">
            Verifikasi CAPTCHA
          </p>
          <RefreshCw size={15} className="text-[var(--muted)]" />
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[var(--green-light)] px-5 py-3 text-sm font-extrabold tracking-widest text-[var(--dark-teal)]">
            {captchaNumbers.first} + {captchaNumbers.second} = ?
          </div>
          <input
            type="number"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Jawaban"
            className="min-w-0 flex-1 rounded-lg border border-[var(--line)] px-3 py-3 text-sm outline-none focus:border-[var(--green)]"
            required
          />
        </div>
        <p className="mt-2 text-[10px] text-[var(--muted)]">
          CAPTCHA ini hanya simulasi untuk prototipe.
        </p>
      </div>

      {error && (
        <p className="text-xs text-[var(--danger)]">{error}</p>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--dark-teal)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)]"
      >
        Daftar dan Lanjutkan
        <ArrowRight size={16} />
      </button>

      <p className="text-center text-xs text-[var(--text)]">
        Sudah memiliki akun?{' '}
        <Link
          to="/login"
          className="font-bold text-[var(--green)] hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  )
}
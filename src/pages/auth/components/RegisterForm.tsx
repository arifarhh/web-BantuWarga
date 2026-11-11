
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UserRound,
  CreditCard,
  Phone,
  ArrowRight,
} from 'lucide-react'

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

    if (name.trim().length < 3) {
      setError('Masukkan nama lengkap yang valid.')
      return
    }

    if (nik.length !== 16) {
      setError('NIK harus terdiri dari 16 digit.')
      return
    }

    if (!/^08\d{8,13}$/.test(phone)) {
      setError('Masukkan nomor HP yang valid, diawali 08.')
      return
    }

    if (
      Number(captchaAnswer) !==
      captchaNumbers.first + captchaNumbers.second
    ) {
      setError('Jawaban verifikasi belum benar.')
      return
    }

    setError('')

    navigate('/verify-otp', {
      state: {
        name: name.trim(),
        phone,
        flow: 'register',
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nama */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-[var(--navy)]"
        >
          Nama lengkap
        </label>

        <div className="flex items-center rounded-xl border border-[var(--line)] px-3 transition focus-within:border-[var(--green)] focus-within:ring-2 focus-within:ring-[var(--green-light)]">
          <UserRound size={17} className="shrink-0 text-[var(--muted)]" />

          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            placeholder="Nama sesuai identitas"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[var(--muted)]"
            required
          />
        </div>
      </div>

      {/* NIK */}
      <div>
        <label
          htmlFor="nik"
          className="mb-2 block text-sm font-semibold text-[var(--navy)]"
        >
          NIK
        </label>

        <div className="flex items-center rounded-xl border border-[var(--line)] px-3 transition focus-within:border-[var(--green)] focus-within:ring-2 focus-within:ring-[var(--green-light)]">
          <CreditCard size={17} className="shrink-0 text-[var(--muted)]" />

          <input
            id="nik"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={nik}
            onChange={(e) => {
              setNik(e.target.value.replace(/\D/g, '').slice(0, 16))
              setError('')
            }}
            placeholder="16 digit NIK"
            maxLength={16}
            className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[var(--muted)]"
            required
          />
        </div>

        <p className="mt-1.5 text-[11px] leading-5 text-[var(--muted)]">
          NIK tidak ditampilkan pada informasi publik.
        </p>
      </div>

      {/* Nomor HP */}
      <div>
        <label
          htmlFor="register-phone"
          className="mb-2 block text-sm font-semibold text-[var(--navy)]"
        >
          Nomor HP
        </label>

        <div className="flex items-center rounded-xl border border-[var(--line)] px-3 transition focus-within:border-[var(--green)] focus-within:ring-2 focus-within:ring-[var(--green-light)]">
          <Phone size={17} className="shrink-0 text-[var(--muted)]" />

          <input
            id="register-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))
              setError('')
            }}
            placeholder="08xxxxxxxxxx"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[var(--muted)]"
            required
          />
        </div>
      </div>

      {/* CAPTCHA */}
      <div className="rounded-xl border border-[var(--line)] p-3.5">
        <label
          htmlFor="captcha"
          className="mb-3 block text-sm font-semibold text-[var(--navy)]"
        >
          Verifikasi sederhana
        </label>

        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-lg bg-[var(--green-light)] px-4 py-3 text-sm font-extrabold text-[var(--teal)]">
            {captchaNumbers.first} + {captchaNumbers.second} = ?
          </div>

          <input
            id="captcha"
            type="number"
            inputMode="numeric"
            value={captchaAnswer}
            onChange={(e) => {
              setCaptchaAnswer(e.target.value)
              setError('')
            }}
            placeholder="Jawaban"
            className="min-w-0 w-full rounded-lg border border-[var(--line)] px-3 py-3 text-sm outline-none transition focus:border-[var(--green)]"
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-xs leading-5 text-[var(--danger)]">{error}</p>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--navy)]"
      >
        Daftar dan lanjutkan
        <ArrowRight size={16} />
      </button>

      <p className="text-center text-sm text-[var(--text)]">
        Sudah punya akun?{' '}
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
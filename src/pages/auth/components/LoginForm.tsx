import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react'
import type { FormEvent } from 'react'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()

  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from
    const redirectTo =
    from?.pathname &&
    from.pathname.startsWith('/') &&
    !from.pathname.startsWith('//')
        ? `${from.pathname}${from.search ?? ''}${from.hash ?? ''}`
        : '/'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!/^08\d{8,13}$/.test(phone)) {
      setError('Masukkan nomor HP yang valid, diawali 08.')
      return
    }

    setError('')

    navigate('/verify-otp', {
      state: {
        phone,
        flow: 'login',
        redirectTo,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-bold text-[var(--navy)]">
          Nomor HP
        </label>

        <div className="flex items-center rounded-lg border border-[var(--line)] px-3 focus-within:border-[var(--green)]">
          <Phone size={17} className="text-[var(--muted)]" />

          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))
              setError('')
            }}
            placeholder="Contoh: 081234567890"
            className="w-full border-0 bg-transparent px-3 py-3 text-sm outline-none"
            required
          />
        </div>

        {error && (
          <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>

      <div className="flex gap-2 rounded-lg bg-[var(--green-light)] p-3">
        <ShieldCheck size={17} className="shrink-0 text-[var(--green)]" />
        <p className="text-xs leading-5 text-[var(--text)]">
          Nomor HP digunakan untuk proses verifikasi dan keamanan akun.
        </p>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--dark-teal)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)]"
      >
        Lanjutkan
        <ArrowRight size={16} />
      </button>

      <p className="text-center text-xs text-[var(--text)]">
        Belum memiliki akun?{' '}
        <Link
          to="/register"
          className="font-bold text-[var(--green)] hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  )
}
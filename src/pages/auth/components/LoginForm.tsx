
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

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
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-semibold text-[var(--navy)]"
        >
          Nomor HP
        </label>

        <div className="flex items-center rounded-xl border border-[var(--line)] px-3 transition focus-within:border-[var(--green)] focus-within:ring-2 focus-within:ring-[var(--green-light)]">
          <Phone size={17} className="shrink-0 text-[var(--muted)]" />

          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 15))
              setError('')
            }}
            placeholder="08xxxxxxxxxx"
            className="w-full bg-transparent px-3 py-3.5 text-sm text-[var(--navy)] outline-none placeholder:text-[var(--muted)]"
            required
          />
        </div>

        {error && (
          <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--navy)]"
      >
        Lanjutkan
        <ArrowRight size={16} />
      </button>

      <p className="text-center text-sm text-[var(--text)]">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="font-bold text-[var(--green)] hover:underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  )
}
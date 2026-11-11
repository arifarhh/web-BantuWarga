
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

interface OTPFormProps {
  phone: string
  name?: string
  flow: 'login' | 'register'
  redirectTo?: string
}

export default function OTPForm({
  phone,
  name,
  flow,
  redirectTo,
}: OTPFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setError('Masukkan 6 digit kode OTP.')
      return
    }

    // Kode OTP simulasi untuk prototipe
    if (otp !== '123456') {
      setError('Kode OTP tidak sesuai. Coba kembali.')
      return
    }

    login({
      name: name || 'Pengguna BantuWarga',
      phone,
    })

    navigate(
      flow === 'login' ? redirectTo || '/' : '/',
      { replace: true },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="otp"
          className="mb-2 block text-sm font-semibold text-[var(--navy)]"
        >
          Kode OTP
        </label>

        <input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
            setError('')
          }}
          placeholder="000000"
          maxLength={6}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[var(--navy)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green-light)]"
          required
        />

        <p className="mt-2 text-xs text-[var(--muted)]">
          Kode uji prototipe: 123456
        </p>

        {error && (
          <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--navy)]"
      >
        Verifikasi
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
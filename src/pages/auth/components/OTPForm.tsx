import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import type { FormEvent } from 'react'

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

    if (otp !== '123456') {
      setError('Kode OTP tidak sesuai. Gunakan kode uji 123456.')
      return
    }

    login({
      name: name || 'Pengguna BantuWarga',
      phone,
    })

    navigate(redirectTo || '/', { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg bg-[var(--green-light)] p-4">
        <div className="flex gap-3">
          <ShieldCheck size={20} className="shrink-0 text-[var(--green)]" />
          <div>
            <p className="text-xs font-bold text-[var(--navy)]">
              Verifikasi nomor HP
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--text)]">
              Masukkan kode OTP untuk nomor {phone}.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-[var(--navy)]">
          Kode OTP
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
            setError('')
          }}
          placeholder="Masukkan 6 digit kode"
          maxLength={6}
          className="w-full rounded-lg border border-[var(--line)] px-4 py-3 text-center text-xl font-bold tracking-[0.5em] outline-none focus:border-[var(--green)]"
          required
        />
        {error && (
          <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>

      <div className="rounded-lg border border-dashed border-[var(--line)] p-3">
        <p className="text-xs text-[var(--text)]">
          <strong>Mode prototipe:</strong> gunakan kode OTP
          <strong> 123456</strong> untuk menguji alur.
          {flow === 'register' && ' Ini bukan kode yang dikirim melalui SMS.'}
        </p>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--dark-teal)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)]"
      >
        Verifikasi
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
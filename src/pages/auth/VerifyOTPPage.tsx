
import { Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AuthLayout from './components/AuthLayout'
import OTPForm from './components/OTPForm'

interface VerifyLocationState {
  phone?: string
  name?: string
  flow?: 'login' | 'register'
  redirectTo?: string
}

export default function VerifyOTPPage() {
  const location = useLocation()
  const state = location.state as VerifyLocationState | null

  if (!state?.phone || !state.flow) {
    return <Navigate to="/login" replace />
  }

  return (
    <AuthLayout
      title="Verifikasi nomor HP"
      description="Masukkan kode verifikasi untuk melanjutkan."
      backTo={state.flow === 'register' ? '/register' : '/login'}
      backLabel="Ubah informasi"
    >
      <div className="mb-6 rounded-xl bg-[var(--background)] p-4">
        <p className="text-xs text-[var(--muted)]">Kode verifikasi dikirim ke</p>
        <p className="mt-1 text-sm font-bold text-[var(--navy)]">
          {state.phone}
        </p>
      </div>

      <OTPForm
        phone={state.phone}
        name={state.name}
        flow={state.flow}
        redirectTo={state.redirectTo}
      />

      <div className="mt-5 text-center">
        <Link
          to={state.flow === 'register' ? '/register' : '/login'}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--green)]"
        >
          <ArrowLeft size={13} />
          Kembali
        </Link>
      </div>
    </AuthLayout>
  )
}
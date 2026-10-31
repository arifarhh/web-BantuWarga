import { Link, useLocation, Navigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import OTPForm from './components/OTPForm'

interface VerifyLocationState {
  phone?: string
  name?: string
  flow?: 'login' | 'register'
}

export default function VerifyOTPPage() {
  const location = useLocation()
  const state = location.state as VerifyLocationState | null

  if (!state?.phone || !state.flow) {
    return <Navigate to="/login" replace />
  }

  return (
    <AuthLayout
      title="Verifikasi OTP"
      description="Selesaikan verifikasi untuk melanjutkan ke akun BantuWarga."
    >
      <OTPForm
        phone={state.phone}
        name={state.name}
        flow={state.flow}
      />

      <div className="mt-5 text-center">
        <Link
          to={state.flow === 'register' ? '/register' : '/login'}
          className="text-xs font-semibold text-[var(--green)] hover:underline"
        >
          Kembali
        </Link>
      </div>
    </AuthLayout>
  )
}
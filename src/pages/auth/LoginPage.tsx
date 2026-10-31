import AuthLayout from './components/AuthLayout'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang"
      description="Masuk ke akun BantuWarga untuk mengakses layanan warga."
    >
      <LoginForm />
    </AuthLayout>
  )
}
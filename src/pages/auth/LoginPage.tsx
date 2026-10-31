import AuthLayout from './components/AuthLayout'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang"
      description="Masuk untuk mengakses layanan BantuWarga."
      backTo="/"
      backLabel="Kembali ke Beranda"
    >
      <LoginForm />
    </AuthLayout>
  )
}
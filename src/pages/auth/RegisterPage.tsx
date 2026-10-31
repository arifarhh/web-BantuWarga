import AuthLayout from './components/AuthLayout'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun"
      description="Daftarkan diri untuk menggunakan layanan warga BantuWarga."
    >
      <RegisterForm />
    </AuthLayout>
  )
}
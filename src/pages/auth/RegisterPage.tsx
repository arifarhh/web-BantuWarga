
import AuthLayout from './components/AuthLayout'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat akun baru"
      description="Isi informasi berikut untuk mendaftarkan akun BantuWarga."
      backTo="/login"
      backLabel="Sudah punya akun? Masuk"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
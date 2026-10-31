import AuthLayout from './components/AuthLayout'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun"
      description="Lengkapi data diri untuk membuat akun BantuWarga."
      backTo="/login"
      backLabel="Kembali ke Login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
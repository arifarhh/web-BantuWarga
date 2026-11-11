import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Building2,
  Clock,
  KeyRound,
} from 'lucide-react'
import { useAdminAuth, DEMO_ADMIN_ACCOUNTS } from '../../../context/AdminAuthContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAdmin, isLocked, remainingLockSeconds, failedAttempts } = useAdminAuth()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/usulan'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!identifier.trim() || !password) {
      setErrorMessage('NIP/Email Dinas dan Kata Sandi wajib diisi.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const result = loginAdmin(identifier, password)
      setIsLoading(false)

      if (result.success) {
        navigate(from, { replace: true })
      } else {
        setErrorMessage(result.message || 'Login gagal.')
      }
    }, 400)
  }

  const handleUseDemoAccount = (accIndex: number) => {
    const acc = DEMO_ADMIN_ACCOUNTS[accIndex]
    if (acc) {
      setIdentifier(acc.nip)
      setPassword(acc.password)
      setErrorMessage('')
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-br from-[#0B1E2B] via-[#102C3D] to-[#0A1A24] text-white">
      {/* Top Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur group-hover:bg-white/20 transition">
              <img
                src="/logo/logo-bantu-warga.png"
                alt="Logo BantuWarga"
                className="h-7 w-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">BantuWarga</p>
              <p className="text-[10px] tracking-wider text-emerald-400 font-medium">PORTAL VERIFIKATOR RESMI</p>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Halaman Publik
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md">
          {/* Card Box */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-6 sm:p-8 text-[#183242] shadow-2xl backdrop-blur-xl">
            {/* Header Badge */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-8 ring-emerald-50/50">
                <Building2 size={28} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-bold text-emerald-800">
                <ShieldCheck size={13} />
                Dinas Sosial Kota Malang
              </span>
              <h1 className="mt-2 text-2xl font-extrabold text-[#1B3C53]">
                Login Verifikator
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Masuk untuk mengelola dan memverifikasi usulan bantuan sosial.
              </p>
            </div>

            {/* Lockout Warning */}
            {isLocked && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                <div className="flex items-center gap-2 font-bold text-red-800">
                  <Clock size={16} />
                  Akses Terkunci Sementara
                </div>
                <p className="mt-1 leading-relaxed">
                  Terlalu banyak percobaan login gagal. Demi keamanan, silakan tunggu{' '}
                  <span className="font-bold underline">{remainingLockSeconds} detik</span> lagi
                  sebelum mencoba kembali.
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && !isLocked && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800">
                <ShieldAlert size={16} className="shrink-0 text-amber-600 mt-0.5" />
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#1B3C53]">
                  NIP / Username / Email Dinas
                </label>
                <div className="relative flex items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <div className="pl-3.5 text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Contoh: 19850315... atau verifikator.malang"
                    disabled={isLocked || isLoading}
                    className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#1B3C53]">
                  Kata Sandi
                </label>
                <div className="relative flex items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <div className="pl-3.5 text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi resmi"
                    disabled={isLocked || isLoading}
                    className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none disabled:bg-slate-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLocked || isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:from-emerald-800 hover:to-teal-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    'Memverifikasi kredensial...'
                  ) : (
                    <>
                      <KeyRound size={16} />
                      Masuk ke Portal Verifikator
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Accounts for Testing */}
            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Mode Prototipe / Demo Akun:
              </p>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUseDemoAccount(0)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-left transition hover:border-emerald-600 hover:bg-emerald-50/50"
                >
                  <p className="text-xs font-bold text-slate-800">Verifikator</p>
                  <p className="text-[10px] text-slate-500">Dra. Endang (NIP)</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleUseDemoAccount(1)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-left transition hover:border-emerald-600 hover:bg-emerald-50/50"
                >
                  <p className="text-xs font-bold text-slate-800">Supervisor</p>
                  <p className="text-[10px] text-slate-500">Rahmat Hidayat, S.AP</p>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Percobaan Gagal: {failedAttempts}/5</span>
                <span className="text-emerald-700 font-semibold">Pass: AdminMalang2026!</span>
              </div>
            </div>
          </div>

          {/* Security Disclaimer */}
          <div className="mt-4 text-center text-[11px] text-slate-400 leading-relaxed">
            <p>
              Portal ini dilindungi sistem keamanan berlapis & pencatatan audit trail aktivitas verifikasi bantuan sosial Kota Malang.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} BantuWarga. Dikelola untuk Transparansi Bansos Kota Malang.
      </footer>
    </div>
  )
}

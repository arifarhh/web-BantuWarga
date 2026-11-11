
import { Navigate, useNavigate } from 'react-router-dom'
import {
  UserRound,
  Phone,
  LogOut,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">

        {/* Back Navigation */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--green)]"
        >
          <ChevronLeft size={17} />
          Beranda
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-3xl">
            Profil Saya
          </h1>
          <p className="mt-2 text-sm text-[var(--text)]">
            Informasi akun BantuWarga.
          </p>
        </div>

        {/* Profile Header */}
        <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_12px_40px_rgba(23,60,81,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green)]">
              <UserRound size={30} strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="break-words text-lg font-extrabold text-[var(--navy)]">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Pengguna BantuWarga
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--green-light)] px-3 py-1.5 text-xs font-semibold text-[var(--teal)]">
              <ShieldCheck size={14} />
              Akun aktif
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">
            <h3 className="mb-4 text-sm font-bold text-[var(--navy)]">
              Informasi Akun
            </h3>

            <div className="divide-y divide-[var(--line)]">
              <div className="flex items-center gap-4 py-4 first:pt-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--green)]">
                  <UserRound size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted)]">
                    Nama lengkap
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-[var(--navy)]">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 last:pb-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--green)]">
                  <Phone size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted)]">
                    Nomor HP
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold text-[var(--navy)]">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logout */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--navy)]">
              Keluar dari akun
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Akhiri sesi penggunaan BantuWarga.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[var(--danger)] px-4 py-2.5 text-sm font-bold text-[var(--danger)] transition hover:bg-red-50"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>
    </main>
  )
}
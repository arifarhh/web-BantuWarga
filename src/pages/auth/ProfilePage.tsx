import { Navigate, useNavigate } from 'react-router-dom'
import { UserRound, Phone, LogOut, ShieldCheck } from 'lucide-react'
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
    <section className="min-h-[70vh] bg-[var(--background)] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-[var(--green)]">
            AKUN WARGA
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-[var(--navy)]">
            Profil Saya
          </h1>
          <p className="mt-2 text-sm text-[var(--text)]">
            Informasi akun BantuWarga.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          <div className="bg-[var(--dark-teal)] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                <UserRound size={30} />
              </div>
              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="mt-1 text-xs text-white/70">
                  Pengguna BantuWarga
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div>
              <p className="mb-3 text-xs font-bold text-[var(--navy)]">
                Informasi Akun
              </p>

              <div className="flex items-center gap-3 rounded-lg bg-[var(--background)] p-4">
                <UserRound size={18} className="text-[var(--green)]" />
                <div>
                  <p className="text-[10px] text-[var(--muted)]">
                    Nama lengkap
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--navy)]">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-lg bg-[var(--background)] p-4">
                <Phone size={18} className="text-[var(--green)]" />
                <div>
                  <p className="text-[10px] text-[var(--muted)]">
                    Nomor HP
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--navy)]">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-[var(--green-light)] p-4">
              <ShieldCheck size={19} className="shrink-0 text-[var(--green)]" />
              <p className="text-xs leading-5 text-[var(--text)]">
                Data profil ini merupakan tampilan prototipe. Pengelolaan
                identitas dan keamanan akun akan dihubungkan dengan backend.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--danger)] px-4 py-3 text-sm font-bold text-[var(--danger)] transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
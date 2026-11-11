
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface AuthLayoutProps {
  title: string
  description: string
  children: ReactNode
  backTo?: string
  backLabel?: string
}

export default function AuthLayout({
  title,
  description,
  children,
  backTo = '/',
  backLabel = 'Kembali ke Beranda',
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--background)] px-4 py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        {/* Logo */}
        <Link
          to="/"
          className="mb-7 flex items-center justify-center gap-3"
        >
          <img
            src="/logo/logo-bantu-warga.png"
            alt="Logo BantuWarga"
            className="h-11 w-11 object-contain"
          />

          <div>
            <p className="text-base font-extrabold tracking-tight text-[var(--navy)]">
              BantuWarga
            </p>
            <p className="mt-0.5 text-[9px] font-medium tracking-[0.08em] text-[var(--muted)]">
              PORTAL TRANSPARANSI BANSOS
            </p>
          </div>
        </Link>

        {/* Auth Card */}
        <section className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-[0_12px_40px_rgba(23,60,81,0.06)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--navy)]">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--text)]">
              {description}
            </p>
          </div>

          {children}
        </section>

        {/* Back Link */}
        <Link
          to={backTo}
          className="mt-6 inline-flex items-center justify-center gap-2 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--green)]"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>
      </div>

      <p className="mt-8 text-center text-[10px] text-[var(--muted)]">
        © {new Date().getFullYear()} BantuWarga
      </p>
    </main>
  )
}
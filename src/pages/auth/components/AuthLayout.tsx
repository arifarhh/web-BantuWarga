import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
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
    <section className="min-h-screen bg-[var(--background)] px-4 py-10 md:py-14">
      <div className="mx-auto max-w-md">

        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <img
            src="/logo/logo-bantu-warga.png"
            alt="Logo BantuWarga"
            className="h-12 w-12 object-contain"
          />

          <div>
            <p className="text-base font-extrabold text-[var(--navy)]">
              BantuWarga
            </p>
            <p className="text-[9px] tracking-wider text-[var(--muted)]">
              PORTAL TRANSPARANSI BANSOS
            </p>
          </div>
        </Link>

        <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold text-[var(--navy)]">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--text)]">
              {description}
            </p>
          </div>

          {children}
        </div>

        <Link
          to={backTo}
          className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[var(--text)] transition hover:text-[var(--green)]"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>

        <p className="mt-8 text-center text-[10px] text-[var(--muted)]">
          © {new Date().getFullYear()} BantuWarga. Portal Transparansi
          Bantuan Sosial.
        </p>
      </div>
    </section>
  )
}

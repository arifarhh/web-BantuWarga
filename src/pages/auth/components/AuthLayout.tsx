import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <section className="min-h-[70vh] bg-[var(--background)] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-md">

        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--dark-teal)] text-white">
            <ShieldCheck size={24} />
          </div>
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

        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          BantuWarga · Portal Transparansi Bantuan Sosial
        </p>
      </div>
    </section>
  )
}
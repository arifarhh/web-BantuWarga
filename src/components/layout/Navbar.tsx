import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Menu,
  X,
  ShieldCheck,
  Bell,
  ChevronDown,
} from 'lucide-react'

const navigation = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Data Penerima', href: '#data-penerima' },
  { label: 'Transparansi', href: '#transparansi' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  // Menentukan menu aktif berdasarkan section yang terlihat
  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          )

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -55% 0px',
        threshold: [0, 0.2, 0.5, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md">
      <div className="container flex h-[76px] items-center justify-between">

        {/* Logo */}
        <a href="#beranda" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--dark-teal)] text-white">
            <ShieldCheck size={23} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-extrabold tracking-tight text-[var(--navy)]">
              BantuWarga
            </p>
            <p className="mt-0.5 text-[9px] font-medium tracking-[0.08em] text-[var(--muted)]">
              PORTAL TRANSPARANSI BANSOS
            </p>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const sectionId = item.href.replace('#', '')
            const isActive = activeSection === sectionId

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(sectionId)}
                className={`border-b-2 py-7 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'border-[var(--green)] text-[var(--navy)]'
                    : 'border-transparent text-[var(--text)] hover:border-[var(--green)] hover:text-[var(--green)]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative rounded-lg p-2 text-[var(--text)] transition hover:bg-[var(--green-light)]"
          >
            <Bell size={18} strokeWidth={1.7} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--danger)]" />
          </button>

          <Link
            to="/proposal"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--green)] hover:bg-[var(--green-light)]"
          >
            Usul Warga
            <ChevronDown size={13} className="-rotate-90" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-[var(--navy)] hover:bg-[var(--green-light)] md:hidden"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="border-t border-[var(--line)] bg-white px-6 py-4 shadow-lg md:hidden">
          <nav className="container flex flex-col gap-1">
            {navigation.map((item) => {
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(sectionId)
                    setIsMenuOpen(false)
                  }}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[var(--green-light)] text-[var(--navy)]'
                      : 'text-[var(--text)] hover:bg-[var(--green-light)] hover:text-[var(--navy)]'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}

            <Link
              to="/proposal"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-[var(--dark-teal)] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--teal)]"
            >
              Usul Warga
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
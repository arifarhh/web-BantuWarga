
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  Menu,
  X,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
  LogIn,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

const guestNavigation = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Data Penerima', href: '#data-penerima' },
  { label: 'Transparansi', href: '#transparansi' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
]

const userNavigation = [
  { label: 'Beranda', href: '/' },
  { label: 'Usul Warga', href: '/proposal' },
  { label: 'Sanggah Warga', href: '/#sanggah-warga' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()

  const navigation = isAuthenticated
    ? userNavigation
    : guestNavigation

  useEffect(() => {
    if (isAuthenticated || location.pathname !== '/') {
      return
    }

    const sections = guestNavigation
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
  }, [isAuthenticated, location.pathname])

  const isNavigationActive = (item: (typeof navigation)[number]) => {
    if (!isAuthenticated) {
      return activeSection === item.href.replace('#', '')
    }

    if (item.href === '/proposal') {
      return location.pathname === '/proposal'
    }

    if (item.href === '/#sanggah-warga') {
      return (
        location.pathname === '/' &&
        location.hash === '#sanggah-warga'
      )
    }

    if (item.href === '/') {
      return location.pathname === '/' &&
        location.hash !== '#sanggah-warga'
    }

    return false
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
  }

  const handleNavigationClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md">
      <div className="container flex h-[76px] items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src="/logo/logo-bantu-warga.png"
            alt="Logo BantuWarga"
            className="h-10 w-10 object-contain"
          />

          <div>
            <p className="text-sm font-extrabold tracking-tight text-[var(--navy)]">
              BantuWarga
            </p>
            <p className="mt-0.5 text-[9px] font-medium tracking-[0.08em] text-[var(--muted)]">
              PORTAL TRANSPARANSI BANSOS
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const isActive = isNavigationActive(item)
            const isAnchor = item.href.startsWith('#')

            const className = `border-b-2 py-7 text-xs font-semibold transition-colors ${
              isActive
                ? 'border-[var(--green)] text-[var(--navy)]'
                : 'border-transparent text-[var(--text)] hover:border-[var(--green)] hover:text-[var(--green)]'
            }`

            return isAnchor ? (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.href.replace('#', ''))}
                className={className}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={className}
              >
                {item.label}
              </Link>
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

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={isProfileMenuOpen}
                onClick={() =>
                  setIsProfileMenuOpen(!isProfileMenuOpen)
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 transition hover:bg-[var(--green-light)]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green)]">
                  <UserRound size={16} />
                </div>

                <span className="max-w-24 truncate text-xs font-bold text-[var(--navy)]">
                  {user.name}
                </span>

                <ChevronDown size={14} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--line)] bg-white p-2 shadow-lg">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-[var(--text)] hover:bg-[var(--green-light)]"
                  >
                    Profil Saya
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-[var(--danger)] hover:bg-red-50"
                  >
                    <LogOut size={14} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--green-light)] px-4 py-2.5 text-xs font-bold text-[var(--teal)] transition hover:bg-[var(--mint)]"
            >
              <LogIn size={15} />
              Masuk
              <ChevronDown size={13} className="-rotate-90" />
            </Link>
          )}
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
              const isActive = isNavigationActive(item)
              const isAnchor = item.href.startsWith('#')

              const className = `rounded-lg px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[var(--green-light)] text-[var(--navy)]'
                  : 'text-[var(--text)] hover:bg-[var(--green-light)] hover:text-[var(--navy)]'
              }`

              return isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href.replace('#', ''))
                    handleNavigationClick()
                  }}
                  className={className}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={handleNavigationClick}
                  className={className}
                >
                  {item.label}
                </Link>
              )
            })}

            {isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleNavigationClick}
                  className="mt-2 flex items-center gap-2 rounded-lg bg-[var(--green-light)] px-4 py-3 text-sm font-bold text-[var(--navy)]"
                >
                  <UserRound size={17} />
                  Profil Saya
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-bold text-[var(--danger)] hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleNavigationClick}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green-light)] px-4 py-3 text-center text-sm font-bold text-[var(--teal)] transition hover:bg-[var(--mint)]"
              >
                <LogIn size={16} />
                Masuk
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut,
  LogIn,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navigation = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Layanan Masyarakat',
    children: [
      { label: 'Usul Warga', href: '/proposal' },
      { label: 'Sanggah Warga', href: '/dispute' },
    ],
  },
  { label: 'Lacak Tiket', href: '/tracking' },
  { label: 'Panduan & Informasi', href: '/panduan' },
  { label: 'Tentang BantuWarga', href: '/tentang' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false)
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false)

  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()

  // Tutup seluruh menu ketika berpindah halaman
  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
    setIsServiceMenuOpen(false)
    setIsMobileServiceOpen(false)
  }, [location.pathname, location.hash])

  // Status aktif menu layanan
  const isServiceActive =
    location.pathname === '/proposal' ||
    location.pathname === '/dispute'

  // Memeriksa halaman yang sedang aktif
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }

    return location.pathname === href
  }

  // Logout
  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
  }

  // Styling menu desktop
  const desktopLinkClass = (active: boolean) =>
    `inline-flex h-[76px] items-center whitespace-nowrap border-b-2 text-[12px] font-semibold leading-none transition-colors duration-200 ${
      active
        ? 'border-[var(--green)] text-[var(--navy)]'
        : 'border-transparent text-[var(--text)] hover:border-[var(--green)] hover:text-[var(--green)]'
    }`

  // Styling menu mobile
  const mobileLinkClass = (active: boolean) =>
    `block rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
      active
        ? 'bg-[var(--green-light)] text-[var(--navy)]'
        : 'text-[var(--text)] hover:bg-[var(--green-light)] hover:text-[var(--navy)]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md">
      <div className="container flex h-[76px] items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
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
            <p className="mt-0.5 whitespace-nowrap text-[9px] font-medium tracking-[0.08em] text-[var(--muted)]">
              PORTAL TRANSPARANSI BANSOS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8">
          {navigation.map((item) => {
            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative flex h-[76px] items-center"
                >
                  <button
                    type="button"
                    aria-expanded={isServiceMenuOpen}
                    aria-haspopup="true"
                    onClick={() =>
                      setIsServiceMenuOpen((prev) => !prev)
                    }
                    className={`${desktopLinkClass(isServiceActive)} gap-1.5 border-x-0 border-t-0 bg-transparent p-0`}
                  >
                    <span>{item.label}</span>

                    <ChevronDown
                      size={13}
                      strokeWidth={1.8}
                      className={`transition-transform duration-200 ${
                        isServiceMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isServiceMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%-1px)] z-50 w-48 rounded-xl border border-[var(--line)] bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsServiceMenuOpen(false)}
                          className={`block rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ${
                            isActive(child.href)
                              ? 'bg-[var(--green-light)] text-[var(--navy)]'
                              : 'text-[var(--text)] hover:bg-[var(--green-light)] hover:text-[var(--navy)]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={desktopLinkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center xl:flex">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={isProfileMenuOpen}
                onClick={() =>
                  setIsProfileMenuOpen((prev) => !prev)
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 transition hover:bg-[var(--green-light)]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green)]">
                  <UserRound size={16} />
                </div>

                <span className="max-w-24 truncate text-xs font-bold text-[var(--navy)]">
                  {user.name}
                </span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-[var(--line)] bg-white p-2 shadow-lg">
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
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-[var(--navy)] transition hover:bg-[var(--green-light)] xl:hidden"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[var(--line)] bg-white px-6 py-4 shadow-lg xl:hidden">
          <nav className="container flex flex-col gap-1">

            {navigation.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isMobileServiceOpen}
                      aria-haspopup="true"
                      onClick={() =>
                        setIsMobileServiceOpen((prev) => !prev)
                      }
                      className={`${mobileLinkClass(isServiceActive)} flex w-full items-center justify-between`}
                    >
                      <span>{item.label}</span>

                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isMobileServiceOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isMobileServiceOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-[var(--green-light)] pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => {
                              setIsMenuOpen(false)
                              setIsMobileServiceOpen(false)
                            }}
                            className={mobileLinkClass(
                              isActive(child.href),
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileLinkClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="my-2 border-t border-[var(--line)]" />

            {/* Mobile Account Actions */}
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-[var(--green-light)] px-4 py-3 text-sm font-bold text-[var(--navy)]"
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
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--green-light)] px-4 py-3 text-center text-sm font-bold text-[var(--teal)] transition hover:bg-[var(--mint)]"
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
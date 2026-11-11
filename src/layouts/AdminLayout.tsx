import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ClipboardList,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Menu,
  X,
  FileSpreadsheet,
  CheckCircle2,
  UserCheck,
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function AdminLayout() {
  const { adminUser, logoutAdmin } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  const navItems = [
    {
      label: 'Manajemen Usulan Bansos',
      href: '/admin/usulan',
      icon: ClipboardList,
      badge: 'Utama',
    },
    {
      label: 'Sanggahan Warga',
      href: '/admin/sanggahan',
      icon: ShieldAlert,
    },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--ink)]">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-[var(--dark-teal)] bg-[var(--dark-teal)] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Link to="/admin/usulan" className="flex items-center gap-3">
              <img src="/logo/logo-bantu-warga.png" alt="" className="h-10 w-10 rounded-xl object-contain" />
              <div>
                <p className="text-sm font-extrabold tracking-tight text-white">
                  BantuWarga
                </p>
                <p className="text-[10px] font-semibold tracking-wider text-[var(--light-green)]">
                  ADMIN VERIFIKATOR
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Verifier Profile Card */}
          <div className="m-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--teal)] text-white font-bold shadow-md">
                <UserCheck size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">
                  {adminUser?.name || 'Verifikator Dinsos'}
                </p>
                <p className="truncate text-[10px] text-[var(--mint)] font-medium">
                  {adminUser?.roleLabel || 'Petugas Verifikator'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  NIP: {adminUser?.nip || '-'}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Sesi Verifikasi Aktif
              </span>
              <span className="text-slate-400">Kota Malang</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 space-y-1.5 px-3">
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Menu Layanan
            </p>

            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold transition ${
                    active
                    ? 'bg-[var(--teal)] text-white shadow-md'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--dark-teal)] text-[var(--light-green)] border border-[var(--teal)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}

            <div className="pt-4">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pintasan
              </p>
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={17} />
                  <span>Lihat Portal Warga</span>
                </div>
                <span className="text-[10px] text-slate-400">Tab Baru</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
          >
            <LogOut size={16} />
            Keluar dari Sesi
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-8 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <CheckCircle2 size={11} />
                  Dinsos Kota Malang
                </span>
                <span className="text-xs text-slate-400">/</span>
                <span className="text-xs font-semibold text-slate-600">Verifikasi Terpadu</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1B3C53]">
                Pusat Manajemen Usulan Bantuan Sosial
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/proposal"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FileSpreadsheet size={15} className="text-emerald-600" />
              Buka Form Warga
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5 pl-1">
              <div className="hidden text-right md:block">
                <p className="text-xs font-bold text-[#1B3C53] leading-tight">
                  {adminUser?.name}
                </p>
                <p className="text-[10px] text-slate-500">{adminUser?.roleLabel}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                {adminUser?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { AdminUser } from '../types/admin.types'

const ADMIN_STORAGE_KEY = 'bantuwarga_admin_session'
const LOCKOUT_STORAGE_KEY = 'bantuwarga_admin_lockout'
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 5 * 60 * 1000 // 5 menit
const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000 // 60 menit

// Akun Resmi Terdaftar untuk Petugas Verifikator Kota Malang
export const DEMO_ADMIN_ACCOUNTS: (AdminUser & { password: string; username: string })[] = [
  {
    id: 'adm-001',
    nip: '198503152010011002',
    username: 'verifikator.malang',
    email: 'verifikator@malangkota.go.id',
    password: 'AdminMalang2026!',
    name: 'Dra. Endang Sulastri',
    role: 'verifikator_kelurahan',
    roleLabel: 'Petugas Verifikator Dinsos Kota Malang',
    district: 'Kota Malang',
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'adm-002',
    nip: '197904122005011004',
    username: 'supervisor.dinsos',
    email: 'admin.dinsos@malangkota.go.id',
    password: 'AdminMalang2026!',
    name: 'Rahmat Hidayat, S.AP',
    role: 'admin_dinsos',
    roleLabel: 'Koordinator Verifikasi & Data Bansos',
    district: 'Kota Malang',
    lastLogin: new Date().toISOString(),
  },
]

interface LockoutState {
  failedAttempts: number
  lockedUntil: number | null
}

interface AdminAuthContextType {
  adminUser: AdminUser | null
  isAuthenticated: boolean
  isLocked: boolean
  remainingLockSeconds: number
  failedAttempts: number
  loginAdmin: (identifier: string, password: string) => { success: boolean; message?: string }
  logoutAdmin: () => void
  resetLockout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  // Sesi Admin
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY)
      return saved ? (JSON.parse(saved) as AdminUser) : null
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY)
      return null
    }
  })

  // State Lockout Brute-Force
  const [lockout, setLockout] = useState<LockoutState>(() => {
    try {
      const saved = localStorage.getItem(LOCKOUT_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as LockoutState
        if (parsed.lockedUntil && parsed.lockedUntil > Date.now()) {
          return parsed
        }
      }
      return { failedAttempts: 0, lockedUntil: null }
    } catch {
      return { failedAttempts: 0, lockedUntil: null }
    }
  })

  const [remainingLockSeconds, setRemainingLockSeconds] = useState<number>(0)

  // Hitung sisa waktu terkunci
  useEffect(() => {
    if (!lockout.lockedUntil) {
      setRemainingLockSeconds(0)
      return
    }

    const interval = setInterval(() => {
      const diffMs = lockout.lockedUntil ? lockout.lockedUntil - Date.now() : 0
      if (diffMs <= 0) {
        setLockout({ failedAttempts: 0, lockedUntil: null })
        localStorage.removeItem(LOCKOUT_STORAGE_KEY)
        setRemainingLockSeconds(0)
        clearInterval(interval)
      } else {
        setRemainingLockSeconds(Math.ceil(diffMs / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lockout.lockedUntil])

  const logoutAdmin = useCallback(() => {
    setAdminUser(null)
    localStorage.removeItem(ADMIN_STORAGE_KEY)
  }, [])

  // Auto Logout saat Inactivity (60 Menit)
  useEffect(() => {
    if (!adminUser) return

    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        logoutAdmin()
        alert('Sesi Anda telah kedaluwarsa karena tidak ada aktivitas selama 60 menit. Demi keamanan, silakan masuk kembali.')
      }, INACTIVITY_TIMEOUT_MS)
    }

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, resetTimer))
    resetTimer()

    return () => {
      clearTimeout(timeoutId)
      events.forEach((ev) => window.removeEventListener(ev, resetTimer))
    }
  }, [adminUser, logoutAdmin])

  const loginAdmin = (identifier: string, password: string) => {
    // Cek apakah masih dalam status terkunci
    if (lockout.lockedUntil && lockout.lockedUntil > Date.now()) {
      const seconds = Math.ceil((lockout.lockedUntil - Date.now()) / 1000)
      return {
        success: false,
        message: `Terlalu banyak percobaan gagal. Akses masuk terkunci sementara selama ${seconds} detik.`,
      }
    }

    const cleanIdentifier = identifier.trim().toLowerCase()
    const found = DEMO_ADMIN_ACCOUNTS.find(
      (acc) =>
        acc.nip === cleanIdentifier ||
        acc.username.toLowerCase() === cleanIdentifier ||
        acc.email.toLowerCase() === cleanIdentifier,
    )

    if (!found || found.password !== password) {
      const newAttempts = lockout.failedAttempts + 1
      let newLockout: LockoutState

      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockedUntil = Date.now() + LOCKOUT_DURATION_MS
        newLockout = { failedAttempts: newAttempts, lockedUntil }
        setLockout(newLockout)
        localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(newLockout))
        return {
          success: false,
          message: `Akun dikunci selama 5 menit karena ${MAX_FAILED_ATTEMPTS} kali percobaan login gagal berturut-turut.`,
        }
      } else {
        newLockout = { failedAttempts: newAttempts, lockedUntil: null }
        setLockout(newLockout)
        localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(newLockout))
        const remainingAttempts = MAX_FAILED_ATTEMPTS - newAttempts
        return {
          success: false,
          message: `Kredensial tidak valid. Sisa percobaan: ${remainingAttempts} kali sebelum akun dikunci sementara.`,
        }
      }
    }

    // Login Sukses
    const userSession: AdminUser = {
      id: found.id,
      nip: found.nip,
      name: found.name,
      email: found.email,
      role: found.role,
      roleLabel: found.roleLabel,
      district: found.district,
      lastLogin: new Date().toISOString(),
    }

    setAdminUser(userSession)
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(userSession))

    // Reset status lockout
    const clearLockout: LockoutState = { failedAttempts: 0, lockedUntil: null }
    setLockout(clearLockout)
    localStorage.removeItem(LOCKOUT_STORAGE_KEY)

    return { success: true }
  }

  const resetLockout = () => {
    const clearLockout: LockoutState = { failedAttempts: 0, lockedUntil: null }
    setLockout(clearLockout)
    localStorage.removeItem(LOCKOUT_STORAGE_KEY)
  }

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: Boolean(adminUser),
        isLocked: Boolean(lockout.lockedUntil && lockout.lockedUntil > Date.now()),
        remainingLockSeconds,
        failedAttempts: lockout.failedAttempts,
        loginAdmin,
        logoutAdmin,
        resetLockout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth harus digunakan di dalam AdminAuthProvider')
  }
  return context
}

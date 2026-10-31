import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface User {
  name: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('bantuwarga-user')

      return savedUser ? (JSON.parse(savedUser) as User) : null
    } catch {
      localStorage.removeItem('bantuwarga-user')
      return null
    }
  })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('bantuwarga-user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('bantuwarga-user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider')
  }

  return context
}
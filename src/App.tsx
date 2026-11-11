import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'

import HomePage from './pages/home/HomePage'
import ProposalPage from './pages/proposal/ProposalPage'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyOTPPage from './pages/auth/VerifyOTPPage'
import ProfilePage from './pages/auth/ProfilePage'

import AdminLoginPage from './pages/admin/auth/AdminLoginPage'
import AdminProposalsPage from './pages/admin/proposals/AdminProposalsPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <Routes>
            {/* Halaman publik dengan Navbar dan Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/proposal"
                element={
                  <ProtectedRoute>
                    <ProposalPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Halaman autentikasi warga */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />

            {/* Halaman login admin/verifikator resmi */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Portal Admin terlindungi */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/usulan" replace />} />
              <Route path="usulan" element={<AdminProposalsPage />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
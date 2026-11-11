
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

import HomePage from './pages/home/HomePage'
import ProposalPage from './pages/proposal/ProposalPage'
import TrackingPage from './pages/tracking/TrackingPage'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyOTPPage from './pages/auth/VerifyOTPPage'
import ProfilePage from './pages/auth/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Halaman publik: menggunakan Navbar dan Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracking" element={<TrackingPage />} />

            {/* Halaman yang membutuhkan autentikasi */}
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

          {/* Halaman autentikasi: tanpa Navbar dan Footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
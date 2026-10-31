import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'

import HomePage from './pages/home/HomePage'
import ProposalPage from './pages/proposal/ProposalPage'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyOTPPage from './pages/auth/VerifyOTPPage'
import ProfilePage from './pages/auth/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            {/* Halaman publik */}
            <Route path="/" element={<HomePage />} />
            <Route path="/proposal" element={<ProposalPage />} />

            {/* Halaman autentikasi */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import HomePage from './pages/home/HomePage'
import ProposalPage from './pages/proposal/ProposalPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/proposal" element={<ProposalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

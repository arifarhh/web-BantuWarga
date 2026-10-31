
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import HomePage from './pages/home/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

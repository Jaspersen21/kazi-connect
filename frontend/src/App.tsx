import { Routes, Route,  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import JobsPage from './pages/JobsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </main>
  )
}

export default App
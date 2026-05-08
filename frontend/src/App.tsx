import { Routes, Route,  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import JobsPage from './pages/JobsPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import ApplicationsPage from './pages/ApplicationsPage'

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/applications"
         element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
         } />
      </Routes>
    </main>
  )
}

export default App
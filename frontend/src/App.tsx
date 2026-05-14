import { Routes, Route,  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import JobsPage from './pages/JobsPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import ApplicationsPage from './pages/ApplicationsPage'
import JobDetailsPage from './pages/JobDetailsPage'
import DashboardPage from './pages/DashboardPage'
import MyApplicationsPage from './pages/MyApplicationsPage'



function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/applications"
         element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
         } />
        <Route path="/my-applications" element={
          <ProtectedRoute>
            <MyApplicationsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  )
}

export default App
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import CreateJobPage from "./pages/CreateJobPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerRoute from "./components/EmployerRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/jobs" element={<JobsPage />} />

        <Route
          path="/jobs/create"
          element={
            <EmployerRoute>
              <CreateJobPage />
            </EmployerRoute>
          }
        />

        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
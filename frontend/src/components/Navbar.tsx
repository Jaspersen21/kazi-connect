import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="font-bold text-lg">Kazi Connect</div>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>

        {isLoggedIn ? (
          <button onClick={logout} className="hover:text-blue-600">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
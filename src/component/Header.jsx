import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="app-header">
      <h1>🎫 Help Desk</h1>

      <nav className="app-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/tickets" end>Tickets</NavLink>

        {/* Only USERs can create tickets */}
        {user?.role === 'USER' && (
          <NavLink to="/tickets/new">New Ticket</NavLink>
        )}
      </nav>

      {/* Right side: show who's logged in + logout button */}
      <div className="app-user">
        <span className="user-info">
          {user?.email} <span className="user-role">({user?.role})</span>
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;

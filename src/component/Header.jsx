import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <h1>🎫 Help Desk</h1>
      <nav className="app-nav">
        <NavLink to="/tickets" end>Tickets</NavLink>
        <NavLink to="/tickets/new">New Ticket</NavLink>
      </nav>
    </header>
  );
}

export default Header;

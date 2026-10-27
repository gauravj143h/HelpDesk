import { useAuth } from '../context/AuthContext';
import './TicketCard.css'

function TicketCard({ ticket }) {
  const { user, logout } = useAuth();
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
        <p>
         Status: <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>
        </p>
      <p>Priority: {ticket.priority}</p>
      <p>Created by: {ticket.CreatedBy}</p>
     {user?.role === 'USER' && (<p>Assigned to: {ticket.AssignedBy}</p>)}
    </div>
  );
}

export default TicketCard;
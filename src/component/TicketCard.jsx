import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import './TicketCard.css'

function TicketCard({ ticket }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="ticket-card" onClick={() => navigate(`/ticket/${ticket.id}`)}>
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

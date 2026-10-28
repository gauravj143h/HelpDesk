import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTicketById } from '../service/ticketService'
import { useAuth } from '../context/AuthContext'
import './Ticket.css'

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState('');

  // Mock conversation data (will be replaced with real API later)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'jaddu@company.com',
      role: 'USER',
      text: 'I am facing this issue since morning. Please help.',
      time: '2026-10-26 09:30 AM',
    },
    {
      id: 2,
      sender: 'support@company.com',
      role: 'SUPPORT_AGENT',
      text: 'Hi, I am looking into this. Can you share a screenshot?',
      time: '2026-10-26 10:15 AM',
    },
    {
      id: 3,
      sender: 'jaddu@company.com',
      role: 'USER',
      text: 'Sure, here it is. The error appears when I click submit.',
      time: '2026-10-26 10:30 AM',
    },
  ]);

  useEffect(() => {
    getTicketById(id)
      .then(data => {
        setTicket(data);
        setStatus(data.status);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  function handleSendReply() {
    if (!replyText.trim()) return;

    // For now just add to local state (no backend yet)
    const newMessage = {
      id: messages.length + 1,
      sender: user.email,
      role: user.role,
      text: replyText,
      time: new Date().toLocaleString(),
    };
    setMessages([...messages, newMessage]);
    setReplyText('');
  }

  function handleStatusChange(newStatus) {
    // For now just update local state (will connect to backend later)
    setStatus(newStatus);
  }

  if (loading) return <main className="content"><p>Loading...</p></main>;
  if (!ticket) return <main className="content"><p>Ticket not found.</p></main>;

  return (
    <main className="content">
      <button className="back-btn" onClick={() => navigate('/tickets')}>← Back to Tickets</button>

      <div className="ticket-detail">
        {/* Ticket Info Section */}
        <div className="ticket-info-card">
          <div className="ticket-header-row">
            <h2>{ticket.title}</h2>
            <span className={`status-badge status-${status}`}>{status}</span>
          </div>

          <div className="ticket-meta">
            <div className="meta-item">
              <span className="meta-label">Ticket ID</span>
              <span className="meta-value">#{ticket.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Priority</span>
              <span className={`priority-badge priority-${ticket.priority}`}>{ticket.priority}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created By</span>
              <span className="meta-value">{ticket.CreatedBy}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Assigned To</span>
              <span className="meta-value">{ticket.AssignedBy || 'Not assigned'}</span>
            </div>
          </div>

          {ticket.description && (
            <div className="ticket-description">
              <h4>Description</h4>
              <p>{ticket.description}</p>
            </div>
          )}

          {/* Status Change — for SUPPORT_AGENT and ADMIN */}
          {(user.role === 'SUPPORT_AGENT' || user.role === 'ADMIN') && (
            <div className="status-change">
              <h4>Change Status</h4>
              <div className="status-buttons">
                <button
                  className={`status-btn ${status === 'OPEN' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('OPEN')}
                >Open</button>
                <button
                  className={`status-btn ${status === 'IN_PROGRESS' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('IN_PROGRESS')}
                >In Progress</button>
                <button
                  className={`status-btn ${status === 'RESOLVED' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('RESOLVED')}
                >Resolved</button>
                <button
                  className={`status-btn ${status === 'CLOSED' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('CLOSED')}
                >Closed</button>
              </div>
            </div>
          )}
        </div>

        {/* Conversation Section */}
        <div className="conversation-card">
          <h3>Conversation</h3>

          <div className="messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`message ${msg.sender === user.email ? 'message-mine' : 'message-other'}`}
              >
                <div className="message-header">
                  <span className="message-sender">{msg.sender}</span>
                  <span className={`message-role role-${msg.role}`}>{msg.role}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="reply-box">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              rows={3}
            />
            <button className="send-btn" onClick={handleSendReply} disabled={!replyText.trim()}>
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Ticket;

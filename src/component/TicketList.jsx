import { useState, useEffect } from 'react'
import { getAllTickets, getTicketsByUserId, getTicketsBySupportId } from '../service/ticketService'
import { useAuth } from '../context/AuthContext'
import TicketCard from './TicketCard'
import './TicketList.css'

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { user } = useAuth();

  function loadTickets() {
    if (user.role === 'ADMIN') {
      // Admin sees all tickets (paginated)
      getAllTickets(currentPage, 9)
        .then(data => {
          setTickets(data.content);
          setTotalPages(data.totalPages);
        })
        .catch(error => console.log(error));
    } else if(user.role === 'USER') {
      // USER sees only their own tickets (plain list)
      getTicketsByUserId(user.id)
        .then(data => {
          setTickets(data);
          setTotalPages(1);   // no pagination from this endpoint
        })
        .catch(error => console.log(error));
    }
    else{
       getTicketsBySupportId(user.id)
        .then(data => {
          setTickets(data);
          setTotalPages(1);   // no pagination from this endpoint
        })
        .catch(error => console.log(error));
    }
  }

  useEffect(() => {
    loadTickets();
  }, [currentPage]);

  // Only show pagination for ADMIN (paginated endpoint)
  const showPagination = user.role === 'ADMIN' && totalPages > 1;

  return (
    <div>
      <div className="ticket-grid">
        {tickets.length === 0 && <p>No tickets found.</p>}
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {showPagination && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TicketList;

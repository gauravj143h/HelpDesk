import { useState, useEffect } from 'react'
import { getTickets } from '../service/ticketService'
import TicketCard from './TicketCard'
import './TicketList.css'

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // pull fetching into its own function so we can call it after creating
  function loadTickets() {
    getTickets(currentPage, 9)
      .then(data => {
        setTickets(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    loadTickets();
  }, [currentPage]);
 // ← re-run whenever currentPage changes

  // Show one card per ticket
  return (
    <div>
    <div className="ticket-grid">
      
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}

    </div>
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
    </div>
  );
}
export default TicketList;
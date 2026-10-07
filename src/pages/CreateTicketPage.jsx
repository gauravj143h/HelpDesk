import { useNavigate } from 'react-router-dom'
import CreateTicketForm from '../component/CreateTicketForm'

function CreateTicketPage() {
  const navigate = useNavigate()

  return (
    <main className="content">
      <h2>New Ticket</h2>
      <CreateTicketForm onTicketCreated={() => navigate('/tickets')} />
    </main>
  )
}

export default CreateTicketPage

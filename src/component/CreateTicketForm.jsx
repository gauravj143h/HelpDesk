import { useState } from 'react'
import { createTicket } from '../service/ticketService'
import { useAuth } from '../context/AuthContext'
import './CreateTicketForm.css'

function CreateTicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');

  // Get the logged-in user's ID automatically — no need to pick from a list
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const newTicket = { title, description, priority };

    try {
      await createTicket(newTicket, user.id);   // use logged-in user's ID
      setTitle('');
      setDescription('');
      setPriority('LOW');
      onTicketCreated();
    } catch (error) {
      console.log('Error creating ticket:', error);
    }
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Create a Ticket</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <button type="submit">Create Ticket</button>
    </form>
  );
}

export default CreateTicketForm;

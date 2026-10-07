import { useState, useEffect } from 'react'
import { createTicket, getUsers } from '../service/ticketService'
import './CreateTicketForm.css'

function CreateTicketForm({ onTicketCreated }) {
  // One piece of state per form field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [userId, setUserId] = useState('');

  // State to hold the list of users for the dropdown
  const [users, setUsers] = useState([]);

  // Load the users once, when the form appears
  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  // Runs when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();   // stop the browser from reloading the page

    const newTicket = { title, description, priority };

    try {
      await createTicket(newTicket, userId);   // send to backend
      // clear the form
      setTitle('');
      setDescription('');
      setPriority('LOW');
      setUserId('');
      onTicketCreated();   // tell the parent to refresh the list
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

      <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
        <option value="">Select user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <button type="submit">Create Ticket</button>
    </form>
  );
}

export default CreateTicketForm;
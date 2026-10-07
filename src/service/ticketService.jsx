// The base address of your backend
const BASE_URL = 'http://localhost:8080/api/ticket';

// This function gets tickets from the backend
export async function getTickets(page = 0, size = 5) {
  // Call the backend URL
  const response = await fetch(`${BASE_URL}/GetTicketPagenumber?page=${page}&size=${size}`);

  // If something went wrong, stop and report it
  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  // Convert the backend's answer into usable data
  const data = await response.json();

// NEW:
return data;   // return the whole page object (content + totalPages + number + etc.)
}

export async function getUsers() {
  const response = await fetch('http://localhost:8080/api/Users/getalluser');
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
}

export async function createTicket(ticket, userId) {
  const response = await fetch(`${BASE_URL}?id=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) throw new Error('Failed to create ticket');
  return await response.json();
}
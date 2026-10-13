// The base address of your backend
const BASE_URL = 'http://localhost:8080/api/ticket';

// Import getToken so we can prove who we are on every request
import { getToken } from './authService';

// Helper: builds headers with the JWT token included
// Every fetch call will use this so the backend knows who's asking
function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// This function gets tickets from the backend
export async function getTickets(page = 0, size = 5) {
  const response = await fetch(
    `${BASE_URL}/GetTicketPagenumber?page=${page}&size=${size}`,
    { headers: authHeaders() }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  const data = await response.json();
  return data;   // return the whole page object (content + totalPages + number + etc.)
}

export async function createTicket(ticket, userId) {
  const response = await fetch(`${BASE_URL}?id=${userId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(ticket),
  });
  if (!response.ok) throw new Error('Failed to create ticket');
  return await response.json();
}

// The base address of your backend
const BASE_URL = 'http://localhost:8080/api/ticket';

// Import getToken and logout so we can prove who we are and handle expiry
import { getToken, logout } from './authService';

// Helper: builds headers with the JWT token included
function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Helper: check if the backend rejected us (401 = token expired or invalid)
// If so, clear the token and send the user back to the login page
function handleUnauthorized(response) {
  if (response.status === 401) {
    logout();
    window.location.href = '/login';
    throw new Error('Session expired — please log in again');
  }
}

// ADMIN — gets all tickets (paginated)
export async function getAllTickets(page = 0, size = 5) {
  const response = await fetch(
    `${BASE_URL}/GetTicketPagenumber?page=${page}&size=${size}`,
    { headers: authHeaders() }
  );

  handleUnauthorized(response);
  if (!response.ok) throw new Error('Failed to fetch tickets');

  return await response.json();   // { content, totalPages, number, ... }
}

// USER — gets only tickets created by this user (plain list, not paginated)
export async function getTicketsByUserId(userId) {
  const response = await fetch(
    `${BASE_URL}/GetTicketUserId?id=${userId}`,
    { headers: authHeaders() }
  );

  handleUnauthorized(response);
  if (!response.ok) throw new Error('Failed to fetch tickets');

  return await response.json();   // returns an array of tickets
}

export async function getTicketsBySupportId(supportId) {
  const response = await fetch(
    `${BASE_URL}/GetTicketByAssignTo?id=${supportId}`,
    { headers: authHeaders() }
  );

  handleUnauthorized(response);
  if (!response.ok) throw new Error('Failed to fetch tickets');

  return await response.json();   // returns an array of tickets
}

export async function getTicketById(ticketId) {
  const response = await fetch(
    `${BASE_URL}/GetTicketById?id=${ticketId}`,
    { headers: authHeaders() }
  );

  handleUnauthorized(response);
  if (!response.ok) throw new Error('Failed to fetch ticket');

  return await response.json();
}

export async function createTicket(ticket, userId) {
  const response = await fetch(`${BASE_URL}?id=${userId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(ticket),
  });
  handleUnauthorized(response);
  if (!response.ok) throw new Error('Failed to create ticket');
  return await response.json();
}

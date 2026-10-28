const LOGIN_URL = 'http://localhost:8080/api/Users/GetLogin';
const TOKEN_KEY = 'helpdesk_token';

// Send email + password to the backend. If correct, save the token it returns.
export async function login(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Invalid email or password');

  // The backend returns only the token (works for plain text or {"token": "..."})
  let token = (await response.text()).trim();
  if (token.startsWith('{')) token = JSON.parse(token).token;

  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

// Read the saved token (null if nobody is logged in)
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Forget the token = log out
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

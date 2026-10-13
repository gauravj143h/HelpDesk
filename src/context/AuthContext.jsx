import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getToken } from '../service/authService';

// 1. Create the "bulletin board" — empty for now
const AuthContext = createContext(null);

// Helper: decode a JWT token to read the claims inside it
// A JWT has 3 parts separated by dots: header.payload.signature
// We only need the middle part (payload) which has user info
function parseToken(token) {
  try {
    const payload = token.split('.')[1];           // grab the middle part
    const json = atob(payload);                     // decode from base64
    return JSON.parse(json);                        // parse into an object
  } catch {
    return null;
  }
}

// 2. The Provider — wraps the app and shares user state with everyone
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // null = not logged in
  const [loading, setLoading] = useState(true); // true while we check for an existing token

  // On first load, check if there's already a token saved (page refresh)
  useEffect(() => {
    const token = getToken();
    if (token) {
      const claims = parseToken(token);
      if (claims) {
        setUser({
          email: claims.sub,        // "sub" is the standard JWT field for the subject (usually email)
          role: claims.role,         // your backend puts the role here
        });
      }
    }
    setLoading(false);
  }, []);

  // Login: call the API, then read who logged in from the token
  async function login(email, password) {
    const token = await apiLogin(email, password);
    const claims = parseToken(token);
    setUser({
      email: claims.sub,
      role: claims.role,
    });
  }

  // Logout: clear token and forget the user
  function logout() {
    apiLogout();
    setUser(null);
  }

  // 3. Share these values with every component inside the Provider
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. A shortcut hook — instead of writing useContext(AuthContext) everywhere,
//    components just call useAuth()
export function useAuth() {
  return useContext(AuthContext);
}

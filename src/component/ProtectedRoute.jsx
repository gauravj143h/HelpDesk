import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component acts like a security guard:
// - If the user is logged in → show the page (children)
// - If not logged in → redirect to /login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Still checking for an existing token — show nothing yet
  if (loading) return null;

  // Not logged in → send to login page
  if (!user) return <Navigate to="/login" replace />;

  // Logged in → show the requested page
  return children;
}

export default ProtectedRoute;

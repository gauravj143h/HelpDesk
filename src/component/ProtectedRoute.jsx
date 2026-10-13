import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component acts like a security guard:
// - If the user is logged in → show the page (children)
// - If not logged in → redirect to /login
// - If allowedRoles is given, only those roles can access the page
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Still checking for an existing token — show nothing yet
  if (loading) return null;

  // Not logged in → send to login page
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but wrong role → send to home page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Logged in + correct role → show the requested page
  return children;
}

export default ProtectedRoute;

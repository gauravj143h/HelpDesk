import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import TicketsPage from './pages/TicketsPage'
import CreateTicketPage from './pages/CreateTicketPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login page — no header, full screen */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected pages — must be logged in, otherwise redirected to /login */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<HomePage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

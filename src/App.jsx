import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import TicketsPage from './pages/TicketsPage'
import CreateTicketPage from './pages/CreateTicketPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/new" element={<CreateTicketPage />} />
      </Route>
    </Routes>
  );
}

export default App;

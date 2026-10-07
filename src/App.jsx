import './App.css'
import Header from './component/Header'
import TicketList from './component/TicketList'

function App() {
  return (
    <div>
      <Header />
      <main className="content">
        <h2>Tickets</h2>
        <TicketList />
      </main>
    </div>
  );
}

export default App;
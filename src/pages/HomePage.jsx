import { Link } from 'react-router-dom'
import './HomePage.css'

const steps = [
  { title: '1. Submit a ticket', text: 'Describe your problem and choose how urgent it is.' },
  { title: '2. We review it', text: 'Your ticket shows up in the list for the support team.' },
  { title: '3. Get it resolved', text: 'Follow its progress on the Tickets page until it is closed.' },
]

const priorities = [
  { name: 'Low', text: 'A minor issue. No rush.' },
  { name: 'Medium', text: 'Affects your work, but there is a workaround.' },
  { name: 'High', text: 'Blocks your work and needs attention soon.' },
  { name: 'Urgent', text: 'A critical problem that needs immediate attention.' },
]

function HomePage() {
  return (
    <main className="content home">
      <section className="home-hero">
        <h2>How can we help you today?</h2>
        <p>Report a problem and track it until it is solved.</p>
        <div className="home-actions">
          <Link to="/tickets/new" className="btn btn-primary">Create a Ticket</Link>
          <Link to="/tickets" className="btn btn-secondary">View Tickets</Link>
        </div>
      </section>

      <section>
        <h3>How it works</h3>
        <div className="home-grid">
          {steps.map(step => (
            <div key={step.title} className="home-card">
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Which priority should I pick?</h3>
        <div className="home-grid">
          {priorities.map(p => (
            <div key={p.name} className="home-card">
              <h4>{p.name}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage

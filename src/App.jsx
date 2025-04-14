import './App.css'
// Routes
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Intakes from './pages/Intakes'

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navigation */}
        <nav className="mb-4 space-x-4">
          <Link to="/intakes">Intakes</Link>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/intakes" element={<Intakes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

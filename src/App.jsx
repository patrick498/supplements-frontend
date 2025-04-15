import './App.css'
// Routes
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Intakes from './pages/Intakes'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navigation */}
        <nav className="mb-4 space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/intakes">Intakes</Link>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/intakes" element={<Intakes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

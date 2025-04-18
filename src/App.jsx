import React from 'react'
import store from './auth/authKitStore'
import AuthProvider from 'react-auth-kit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

console.log('Login:', Login)
console.log('Store:', store)

function App() {
  return (
    <AuthProvider store={store}>
      <Router>
        <Routes>{/* <Route path="/" element={<Login />} /> */}</Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

// import './App.css'
// // Routes
// import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // import Intakes from './pages/Intakes'
// import Login from './pages/Login'

// function App() {
//   return (
//     <Router>
//       <div className="p-4">
//         {/* Navigation */}
//         <nav className="mb-4 space-x-4">
//           {/* <Link to="/intakes">Intakes</Link> */}
//           <Link to="/login">Login</Link>
//         </nav>
//         {/* Routes */}
//         <Routes>
//           {/* <Route path="/" element={<Login />} /> */}
//           {/* <Route path="/intakes" element={<Intakes />} /> */}
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App

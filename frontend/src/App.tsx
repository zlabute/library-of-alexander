import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import { BrowseLibrary } from './pages/BrowseLibrary'

interface Book {
  id: number
  title: string
  genre: string
  progress: number
}

function Navigation() {
  const location = useLocation()
  
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo-icon">A</div>
        <div className="logo-text">
          Library of <span>Alexander</span>
        </div>
      </Link>
      <nav className="nav">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/library" 
          className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`}
        >
          My Books
        </Link>
      </nav>
    </header>
  )
}

export function AppContent() {
  const [books] = useState<Book[]>([
    { id: 1, title: 'The Name of the Wind', genre: 'Fantasy', progress: 45 },
    { id: 2, title: 'Dune', genre: 'Sci-Fi', progress: 72 },
    { id: 3, title: 'Project Hail Mary', genre: 'Sci-Fi', progress: 23 },
  ])

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/library" element={<BrowseLibrary />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

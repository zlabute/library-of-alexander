import { useState } from 'react'

type BookStatus = 'all' | 'reading' | 'completed' | 'want-to-read'

interface Book {
  id: number
  title: string
  author: string
  genre: string
  progress: number
  status: BookStatus
  coverColor: string
  pages: number
  currentPage: number
  dateAdded: string
}

const mockBooks: Book[] = [
  { id: 1, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', progress: 45, status: 'reading', coverColor: '#4a2c7a', pages: 662, currentPage: 298, dateAdded: '2024-10-15' },
  { id: 2, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', progress: 72, status: 'reading', coverColor: '#3d2266', pages: 412, currentPage: 297, dateAdded: '2024-09-20' },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Sci-Fi', progress: 23, status: 'reading', coverColor: '#d4a520', pages: 496, currentPage: 114, dateAdded: '2024-11-01' },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', progress: 100, status: 'completed', coverColor: '#2d6a4f', pages: 310, currentPage: 310, dateAdded: '2024-08-05' },
  { id: 5, title: '1984', author: 'George Orwell', genre: 'Dystopian', progress: 100, status: 'completed', coverColor: '#9d4edd', pages: 328, currentPage: 328, dateAdded: '2024-07-12' },
  { id: 6, title: 'The Martian', author: 'Andy Weir', genre: 'Sci-Fi', progress: 100, status: 'completed', coverColor: '#e63946', pages: 369, currentPage: 369, dateAdded: '2024-06-18' },
  { id: 7, title: 'Neuromancer', author: 'William Gibson', genre: 'Cyberpunk', progress: 0, status: 'want-to-read', coverColor: '#00b4d8', pages: 271, currentPage: 0, dateAdded: '2024-11-10' },
  { id: 8, title: 'Snow Crash', author: 'Neal Stephenson', genre: 'Cyberpunk', progress: 0, status: 'want-to-read', coverColor: '#fb8500', pages: 480, currentPage: 0, dateAdded: '2024-11-08' },
]

export function BrowseLibrary() {
  const [filter, setFilter] = useState<BookStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBooks = mockBooks.filter(book => {
    const matchesFilter = filter === 'all' || book.status === filter
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusLabel = (status: BookStatus) => {
    switch (status) {
      case 'reading': return 'Currently Reading'
      case 'completed': return 'Completed'
      case 'want-to-read': return 'Want to Read'
      default: return status
    }
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <div className="library-title-section">
          <h1 className="library-title">My Library</h1>
          <p className="library-subtitle">{mockBooks.length} books in your collection</p>
        </div>
        
        <div className="library-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button className="btn btn-primary btn-add">
            <span>+</span>
            Add Book
          </button>
        </div>
      </div>

      <div className="filter-tabs">
        {(['all', 'reading', 'completed', 'want-to-read'] as BookStatus[]).map((status) => (
          <button
            key={status}
            className={`filter-tab ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status === 'all' ? 'All Books' : getStatusLabel(status)}
            <span className="filter-count">
              {status === 'all' 
                ? mockBooks.length 
                : mockBooks.filter(b => b.status === status).length}
            </span>
          </button>
        ))}
      </div>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="library-book-card">
            <div 
              className="library-book-cover" 
              style={{ background: `linear-gradient(145deg, ${book.coverColor} 0%, ${book.coverColor}dd 100%)` }}
            >
              <div className="book-spine" />
              <div className="book-cover-content">
                <span className="book-cover-genre">{book.genre}</span>
                <h3 className="book-cover-title">{book.title}</h3>
                <span className="book-cover-author">{book.author}</span>
              </div>
              {book.status === 'reading' && (
                <div className="book-cover-progress">
                  <div className="cover-progress-bar">
                    <div 
                      className="cover-progress-fill" 
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="library-book-info">
              <div className="book-meta">
                <span className={`book-status status-${book.status}`}>
                  {book.status === 'reading' && '📖'}
                  {book.status === 'completed' && '✓'}
                  {book.status === 'want-to-read' && '📋'}
                  {getStatusLabel(book.status)}
                </span>
              </div>
              
              {book.status === 'reading' && (
                <div className="book-reading-info">
                  <span className="pages-info">
                    Page {book.currentPage} of {book.pages}
                  </span>
                  <span className="progress-percent">{book.progress}%</span>
                </div>
              )}
              
              {book.status === 'completed' && (
                <div className="book-reading-info">
                  <span className="pages-info">{book.pages} pages</span>
                </div>
              )}
              
              {book.status === 'want-to-read' && (
                <div className="book-reading-info">
                  <span className="pages-info">{book.pages} pages</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No books found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}


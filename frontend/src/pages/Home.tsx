import { Link } from 'react-router-dom'

interface Book {
  id: number
  title: string
  genre: string
  progress: number
}

interface HomeProps {
  books: Book[]
}

export function Home({ books }: HomeProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tagline">Your Personal Reading Journey</p>
            <h1 className="hero-title">
              Track Every Page,
              <span className="highlight">Remember Every Story</span>
            </h1>
            <p className="hero-description">
              A sanctuary for readers. Chronicle your literary adventures, 
              revisit forgotten tales, and never lose your place in the 
              stories that matter most.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                <span>📚</span>
                Add New Book
              </button>
              <Link to="/library" className="btn btn-secondary">
                Browse Library
              </Link>
            </div>
          </div>

          <div className="books-showcase">
            <div className="book-stack">
              {books.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="book-content">
                    <span className="book-genre">{book.genre}</span>
                    <h3 className="book-title">{book.title}</h3>
                    <div className="book-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{book.progress}% complete</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">24</div>
          <div className="stat-label">Books Read</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">3</div>
          <div className="stat-label">Currently Reading</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">8,432</div>
          <div className="stat-label">Pages Turned</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">Journal Entries</div>
        </div>
      </div>
    </>
  )
}


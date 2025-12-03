import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Home'

const mockBooks = [
  { id: 1, title: 'Test Book 1', genre: 'Fantasy', progress: 45 },
  { id: 2, title: 'Test Book 2', genre: 'Sci-Fi', progress: 72 },
  { id: 3, title: 'Test Book 3', genre: 'Mystery', progress: 23 },
]

const renderHome = (books = mockBooks) => {
  return render(
    <BrowserRouter>
      <Home books={books} />
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  describe('Hero Section', () => {
    it('renders the tagline', () => {
      renderHome()
      expect(screen.getByText('Your Personal Reading Journey')).toBeInTheDocument()
    })

    it('renders the main headline', () => {
      renderHome()
      expect(screen.getByText('Track Every Page,')).toBeInTheDocument()
      expect(screen.getByText('Remember Every Story')).toBeInTheDocument()
    })

    it('renders the description text', () => {
      renderHome()
      expect(screen.getByText(/a sanctuary for readers/i)).toBeInTheDocument()
    })

    it('renders the Add New Book button', () => {
      renderHome()
      expect(screen.getByRole('button', { name: /add new book/i })).toBeInTheDocument()
    })

    it('renders the Browse Library link', () => {
      renderHome()
      expect(screen.getByRole('link', { name: /browse library/i })).toBeInTheDocument()
    })

    it('Browse Library link points to /library', () => {
      renderHome()
      const link = screen.getByRole('link', { name: /browse library/i })
      expect(link).toHaveAttribute('href', '/library')
    })
  })

  describe('Book Cards', () => {
    it('renders all book cards', () => {
      renderHome()
      expect(screen.getByText('Test Book 1')).toBeInTheDocument()
      expect(screen.getByText('Test Book 2')).toBeInTheDocument()
      expect(screen.getByText('Test Book 3')).toBeInTheDocument()
    })

    it('displays book genres', () => {
      renderHome()
      expect(screen.getByText('Fantasy')).toBeInTheDocument()
      expect(screen.getByText('Sci-Fi')).toBeInTheDocument()
      expect(screen.getByText('Mystery')).toBeInTheDocument()
    })

    it('displays reading progress for each book', () => {
      renderHome()
      expect(screen.getByText('45% complete')).toBeInTheDocument()
      expect(screen.getByText('72% complete')).toBeInTheDocument()
      expect(screen.getByText('23% complete')).toBeInTheDocument()
    })

    it('renders empty state gracefully when no books', () => {
      renderHome([])
      // Should still render the hero section
      expect(screen.getByText('Your Personal Reading Journey')).toBeInTheDocument()
    })
  })

  describe('Stats Bar', () => {
    it('renders books read stat', () => {
      renderHome()
      expect(screen.getByText('24')).toBeInTheDocument()
      expect(screen.getByText('Books Read')).toBeInTheDocument()
    })

    it('renders currently reading stat', () => {
      renderHome()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('Currently Reading')).toBeInTheDocument()
    })

    it('renders pages turned stat', () => {
      renderHome()
      expect(screen.getByText('8,432')).toBeInTheDocument()
      expect(screen.getByText('Pages Turned')).toBeInTheDocument()
    })

    it('renders journal entries stat', () => {
      renderHome()
      expect(screen.getByText('12')).toBeInTheDocument()
      expect(screen.getByText('Journal Entries')).toBeInTheDocument()
    })
  })
})


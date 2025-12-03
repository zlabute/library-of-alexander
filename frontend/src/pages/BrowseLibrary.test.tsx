import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { BrowseLibrary } from './BrowseLibrary'

const renderBrowseLibrary = () => {
  return render(<BrowseLibrary />)
}

describe('Browse Library Page', () => {
  describe('Header Section', () => {
    it('renders the page title', () => {
      renderBrowseLibrary()
      expect(screen.getByRole('heading', { name: /my library/i })).toBeInTheDocument()
    })

    it('displays book count in subtitle', () => {
      renderBrowseLibrary()
      expect(screen.getByText(/8 books in your collection/i)).toBeInTheDocument()
    })

    it('renders search input', () => {
      renderBrowseLibrary()
      expect(screen.getByPlaceholderText(/search by title or author/i)).toBeInTheDocument()
    })

    it('renders Add Book button', () => {
      renderBrowseLibrary()
      expect(screen.getByRole('button', { name: /add book/i })).toBeInTheDocument()
    })
  })

  describe('Filter Tabs', () => {
    it('renders all filter tabs', () => {
      renderBrowseLibrary()
      expect(screen.getByRole('button', { name: /all books/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /currently reading/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /want to read/i })).toBeInTheDocument()
    })

    it('shows correct counts on filter tabs', () => {
      renderBrowseLibrary()
      expect(screen.getByRole('button', { name: /all books 8/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /currently reading 3/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /completed 3/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /want to read 2/i })).toBeInTheDocument()
    })

    it('filters books when clicking Currently Reading tab', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      await user.click(screen.getByRole('button', { name: /currently reading 3/i }))
      
      // Should show currently reading books
      expect(screen.getByText('The Name of the Wind')).toBeInTheDocument()
      expect(screen.getByText('Dune')).toBeInTheDocument()
      expect(screen.getByText('Project Hail Mary')).toBeInTheDocument()
      
      // Should not show completed or want to read books
      expect(screen.queryByText('The Hobbit')).not.toBeInTheDocument()
      expect(screen.queryByText('Neuromancer')).not.toBeInTheDocument()
    })

    it('filters books when clicking Completed tab', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      await user.click(screen.getByRole('button', { name: /completed 3/i }))
      
      // Should show completed books
      expect(screen.getByText('The Hobbit')).toBeInTheDocument()
      expect(screen.getByText('1984')).toBeInTheDocument()
      expect(screen.getByText('The Martian')).toBeInTheDocument()
      
      // Should not show other books
      expect(screen.queryByText('Dune')).not.toBeInTheDocument()
    })

    it('filters books when clicking Want to Read tab', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      await user.click(screen.getByRole('button', { name: /want to read 2/i }))
      
      // Should show want to read books
      expect(screen.getByText('Neuromancer')).toBeInTheDocument()
      expect(screen.getByText('Snow Crash')).toBeInTheDocument()
      
      // Should not show other books
      expect(screen.queryByText('Dune')).not.toBeInTheDocument()
    })

    it('shows all books when clicking All Books tab', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      // First filter to a specific category
      await user.click(screen.getByRole('button', { name: /completed 3/i }))
      
      // Then click All Books
      await user.click(screen.getByRole('button', { name: /all books 8/i }))
      
      // Should show all books
      expect(screen.getByText('The Name of the Wind')).toBeInTheDocument()
      expect(screen.getByText('The Hobbit')).toBeInTheDocument()
      expect(screen.getByText('Neuromancer')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('filters books by title', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'Dune')
      
      expect(screen.getByText('Dune')).toBeInTheDocument()
      expect(screen.queryByText('The Hobbit')).not.toBeInTheDocument()
    })

    it('filters books by author', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'Andy Weir')
      
      expect(screen.getByText('Project Hail Mary')).toBeInTheDocument()
      expect(screen.getByText('The Martian')).toBeInTheDocument()
      expect(screen.queryByText('Dune')).not.toBeInTheDocument()
    })

    it('search is case insensitive', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'dune')
      
      expect(screen.getByText('Dune')).toBeInTheDocument()
    })

    it('shows empty state when no results match', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'xyznonexistent')
      
      expect(screen.getByText(/no books found/i)).toBeInTheDocument()
    })

    it('combines search with filter', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      // Filter to completed
      await user.click(screen.getByRole('button', { name: /completed 3/i }))
      
      // Search for Andy Weir
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'Andy Weir')
      
      // Should only show The Martian (completed book by Andy Weir)
      expect(screen.getByText('The Martian')).toBeInTheDocument()
      expect(screen.queryByText('Project Hail Mary')).not.toBeInTheDocument() // reading, not completed
    })
  })

  describe('Book Cards', () => {
    it('displays book titles', () => {
      renderBrowseLibrary()
      expect(screen.getByText('The Name of the Wind')).toBeInTheDocument()
      expect(screen.getByText('Dune')).toBeInTheDocument()
      expect(screen.getByText('The Hobbit')).toBeInTheDocument()
    })

    it('displays book authors', () => {
      renderBrowseLibrary()
      expect(screen.getByText('Patrick Rothfuss')).toBeInTheDocument()
      expect(screen.getByText('Frank Herbert')).toBeInTheDocument()
      expect(screen.getByText('J.R.R. Tolkien')).toBeInTheDocument()
    })

    it('displays book genres', () => {
      renderBrowseLibrary()
      expect(screen.getAllByText('Fantasy').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Sci-Fi').length).toBeGreaterThan(0)
      expect(screen.getByText('Dystopian')).toBeInTheDocument()
      expect(screen.getAllByText('Cyberpunk').length).toBe(2)
    })

    it('displays status badges for currently reading books', () => {
      renderBrowseLibrary()
      const currentlyReadingBadges = screen.getAllByText(/currently reading/i)
      expect(currentlyReadingBadges.length).toBeGreaterThan(0)
    })

    it('displays status badges for completed books', () => {
      renderBrowseLibrary()
      const completedBadges = screen.getAllByText(/✓completed/i)
      expect(completedBadges.length).toBe(3)
    })

    it('displays status badges for want to read books', () => {
      renderBrowseLibrary()
      const wantToReadBadges = screen.getAllByText(/want to read/i)
      // Filter tabs also contain this text, so we check for the badge specifically
      expect(wantToReadBadges.length).toBeGreaterThan(1)
    })

    it('displays page progress for currently reading books', () => {
      renderBrowseLibrary()
      expect(screen.getByText('Page 298 of 662')).toBeInTheDocument()
      expect(screen.getByText('Page 297 of 412')).toBeInTheDocument()
      expect(screen.getByText('Page 114 of 496')).toBeInTheDocument()
    })

    it('displays progress percentage for currently reading books', () => {
      renderBrowseLibrary()
      expect(screen.getByText('45%')).toBeInTheDocument()
      expect(screen.getByText('72%')).toBeInTheDocument()
      expect(screen.getByText('23%')).toBeInTheDocument()
    })

    it('displays page count for completed books', () => {
      renderBrowseLibrary()
      expect(screen.getByText('310 pages')).toBeInTheDocument()
      expect(screen.getByText('328 pages')).toBeInTheDocument()
      expect(screen.getByText('369 pages')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('shows empty state with appropriate message', async () => {
      const user = userEvent.setup()
      renderBrowseLibrary()
      
      const searchInput = screen.getByPlaceholderText(/search by title or author/i)
      await user.type(searchInput, 'nonexistentbook12345')
      
      expect(screen.getByText(/no books found/i)).toBeInTheDocument()
      expect(screen.getByText(/try adjusting your search or filters/i)).toBeInTheDocument()
    })
  })
})


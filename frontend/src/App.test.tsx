import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppContent } from './App'

// Helper to render App with router
const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppContent />
    </MemoryRouter>
  )
}

describe('App', () => {
  describe('Header and Navigation', () => {
    it('renders the logo with correct text', () => {
      renderApp()
      expect(screen.getByText('Library of')).toBeInTheDocument()
      expect(screen.getByText('Alexander')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      renderApp()
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /my books/i })).toBeInTheDocument()
    })

    it('navigates to home page when clicking Home link', async () => {
      const user = userEvent.setup()
      renderApp('/library')
      
      await user.click(screen.getByRole('link', { name: /home/i }))
      
      expect(screen.getByText('Track Every Page,')).toBeInTheDocument()
    })

    it('navigates to library page when clicking My Books link', async () => {
      const user = userEvent.setup()
      renderApp('/')
      
      await user.click(screen.getByRole('link', { name: /my books/i }))
      
      expect(screen.getByRole('heading', { name: /my library/i })).toBeInTheDocument()
    })

    it('navigates to home when clicking logo', async () => {
      const user = userEvent.setup()
      renderApp('/library')
      
      // Click the logo link (contains "Library of Alexander")
      const logoLink = screen.getByRole('link', { name: /a library of alexander/i })
      await user.click(logoLink)
      
      expect(screen.getByText('Track Every Page,')).toBeInTheDocument()
    })
  })

  describe('Routing', () => {
    it('renders Home page on root route', () => {
      renderApp('/')
      expect(screen.getByText('Your Personal Reading Journey')).toBeInTheDocument()
    })

    it('renders Library page on /library route', () => {
      renderApp('/library')
      expect(screen.getByRole('heading', { name: /my library/i })).toBeInTheDocument()
    })
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the title', () => {
    render(<App />)
    expect(screen.getByText('Library of Alexander')).toBeInTheDocument()
  })

  it('increments counter on button click', () => {
    render(<App />)
    const button = screen.getByRole('button')
    
    expect(button).toHaveTextContent('Count: 0')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 1')
    
    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 2')
  })
})


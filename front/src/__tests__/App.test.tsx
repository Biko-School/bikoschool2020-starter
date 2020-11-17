import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Meme detail', () => {
  it('should redirect to the detail page when meme image clicked', async () => {
    render(<App />)

    const imageElement = await screen.findByRole('img', {
      name: 'Movie Brazil GIF by MOODMAN',
    })
    userEvent.click(imageElement)

    const testElement = await screen.findByText('Movie Brazil GIF by MOODMAN')
    expect(testElement).toBeInTheDocument()
  })
})

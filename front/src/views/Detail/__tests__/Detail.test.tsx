import React from 'react'
import { render, screen } from '@testing-library/react'
import { Detail } from '../Detail'
import { BrowserRouter } from 'react-router-dom'

describe('Detail of a meme', () => {
  it('should show a meme title', async () => {
    render(<Detail />, { wrapper: BrowserRouter })

    const testElement = await screen.findByText('Movie Brazil GIF by MOODMAN')
    expect(testElement).toBeInTheDocument()
  })
})

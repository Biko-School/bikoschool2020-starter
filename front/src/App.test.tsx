import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import memes from './fixtures/memes.json'
import { server } from './mocks/server'
import { rest } from 'msw'

const errorMessage = 'Se ha producido un error'

describe('List of memes', () => {
  it('should show memes', async () => {
    render(<App />)

    for (let meme of memes) {
      const memeTextElement = await screen.findByText(meme.title)
      expect(
        await screen.findByRole('img', { name: meme.title }),
      ).toHaveAttribute('src', meme.image.url)
      expect(memeTextElement).toBeInTheDocument()
    }
  })

  it('should show memes', async () => {
    server.use(
      rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )

    render(<App />)

    const errorElement = await screen.findByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
  })

  it('should retrieve memes from resource', async () => {
    jest.spyOn(window, 'fetch')

    render(<App />)

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/memes')
  })
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import memes from './fixtures/memes.json'
import { server } from './mocks/server'
import { rest } from 'msw'

const errorMessage500 = 'Se ha producido un error'
const errorMessageAtLeast4Characteres =
  'La longitud mínima de búsqueda debe de ser 3 carácteres'
const HTTP_OK = 200
const HTTP_FORBIDEN = 403
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

    const errorElement = await screen.findByText(errorMessage500)
    expect(errorElement).toBeInTheDocument()
  })
})

describe('Search  memes', () => {
  it('should have search button disabled with words with less than 2 characters', async () => {
    render(<App />)

    const inputElement = screen.getByRole('textbox', {
      name: /inputMeme/i,
    })

    fireEvent.change(inputElement, { target: { value: 'ca' } })
    const buttonElement = screen.getByRole('button', {
      name: /searchMeme/i,
    })

    expect(buttonElement).toHaveAttribute('disabled')
  })
})

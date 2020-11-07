import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from './mocks/server'
import { rest } from 'msw'
import App from './App'
import { memes } from './fixture/recent.json'
import searchResultMovie from './fixture/search_movie.json'
import { act } from 'react-dom/test-utils'

describe('Listado de memes', () => {
  it('should recibe meme list from API', async () => {
    render(<App />)

    for (const meme of memes) {
      const image = await screen.findByRole('img', { name: meme.title })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', meme.url)
    }
  })
  it('should show message error if the request fail', async () => {
    server.use(
      rest.get('http://localhost:5000/api/memes', (_, res, ctx) => res(ctx.status(500))),
    )
    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Oops!')
  })
})

describe('Search memesSearch memes', () => {
  it('Should show the results from user search', async () => {
    render(<App />)

    userEvent.type(screen.getByRole('searchbox'), 'movie')
    userEvent.click(screen.getByRole('button', { name: "Search" }))

    for (const meme of searchResultMovie.memes) {
      const image = await screen.findByRole('img', { name: meme.title })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', meme.url)
    }

  })
  it('should show message error if the request with movie term fail', async () => {
    server.use(
      rest.get('http://localhost:5000/api/memes', (req, res, ctx) => {
        const search = req.url.searchParams.get('search')
        if (search === 'movie') {
          return res(ctx.status(500))
        }
        return res(ctx.status(200), ctx.json([]))
      }),
    )
    render(<App />)

    userEvent.type(screen.getByRole('searchbox'), 'movie')
    userEvent.click(screen.getByRole('button', { name: "Search" }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Oops!')
  })
})

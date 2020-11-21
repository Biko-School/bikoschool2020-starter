import React from 'react'
import { screen } from '@testing-library/react'
import { server } from './mocks/server'
import { rest } from 'msw'
import App from './App'
import { renderWithProviders } from './testUtils'
import { MemeDetails } from './models/MemeDetails'

describe('App', () => {
  it('Should render home page ', async () => {
    renderWithProviders(<App />)

    expect(
      await screen.findByText(/Los guif mas trending del momento/i),
    ).toBeInTheDocument()
  })
  it('Should render meme details ', async () => {
    const meme: MemeDetails = {
      id: '26xBKlTBLN10xp7oc',
      title: 'Stranger Things Reaction GIF',
      url:
        'https://media3.giphy.com/media/26xBKlTBLN10xp7oc/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif',
      tags: ['#movie'],
      author: {
        displayName: 'SAG Awards',
        avatarUrl:
          'https://media4.giphy.com/avatars/sagawards/HsvQ4GGcXMxE.jpg',
      },
    }
    server.use(
      rest.get('http://localhost:5000/api/memes/:id', (_, res, ctx) =>
        res(ctx.status(200), ctx.json(meme)),
      ),
    )
    renderWithProviders(<App />, { route: '/meme/id123' })

    expect(
      await screen.findByRole('heading', {
        name: `${meme.title} by ${meme.author?.displayName}`,
        level: 1,
      }),
    ).toBeInTheDocument()
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithProviders } from '../../testUtils'
import { Details } from '../Details/Details'
import { server } from '../../mocks/server'
import { rest } from 'msw'
import { MemeDetails } from '../../models/MemeDetails'

describe('Meme details', () => {
  it('should show the meme image, title, tags, avatar and author', async () => {
    const meme: MemeDetails = {
      id: '26xBKlTBLN10xp7oc',
      title: 'Stranger Things Reaction GIF by SAG Awards',
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
    renderWithProviders(<Details />)

    expect(
      await screen.findByRole('img', { name: meme.title }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('heading', {
        name: `${meme.title} by ${meme.author?.displayName}`,
        level: 1,
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('img', {
        name: meme.author?.displayName,
      }),
    ).toBeInTheDocument()

    for (const tag of meme.tags) {
      expect(await screen.findByText(tag)).toBeInTheDocument()
    }

    expect(
      await screen.findByText(meme.author?.displayName as string),
    ).toBeInTheDocument()
  })
})

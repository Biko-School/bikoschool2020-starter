import React from 'react'
import { screen } from '@testing-library/react'
import { server } from '../../mocks/server'
import { rest } from 'msw'
import { Home } from './Home'
import { Meme } from '../../models/Meme'
import { memes } from '../../fixture/recent.json'
import { renderWithProviders } from '../../testUtils'

describe('Listado de memes', () => {
  it('should recibe meme list from API', async () => {
    renderWithProviders(<Home />)

    for (const meme of memes) {
      const image = await screen.findByRole('img', { name: meme.title })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', meme.url)
    }
  })
  it('should show message error if the request fail', async () => {
    server.use(
      rest.get('http://localhost:5000/api/memes', (_, res, ctx) =>
        res(ctx.status(500)),
      ),
    )
    renderWithProviders(<Home />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Oops!')
  })
  it('should show author when meme has this info', async () => {
    const memeWithAuthor: Meme = {
      id: 'YleuWir5NTNVXkflSp',
      title: 'Movie Brazil GIF by MOODMAN',
      url:
        'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      author: {
        displayName: 'Author Name',
        avatarUrl: 'avatar.jpg',
      },
    }
    server.use(
      rest.get('http://localhost:5000/api/memes', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ memes: [memeWithAuthor] }))
      }),
    )
    renderWithProviders(<Home />)

    const authorAvatar = await screen.findByRole('img', {
      name: memeWithAuthor.author?.displayName,
    })
    expect(authorAvatar).toHaveAttribute(
      'src',
      memeWithAuthor.author?.avatarUrl,
    )
    expect(
      await screen.findByText(memeWithAuthor.author?.displayName as string),
    ).toBeInTheDocument()
  })
})
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import memes from './fixtures/memes.json'
import { server } from './mocks/server'
import { rest } from 'msw'
import MemeList from './views/componets/MemeCard'
import { Meme } from './Meme'

const errorMessage500 = 'Se ha producido un error'

describe('List of memes', () => {
  it('should show memes and logo text as GUIFAFFINITY', async () => {
    render(<App />)
    const textLogo = await screen.findByText('GUIFAFFINITY')
    expect(textLogo).toBeInTheDocument()
    for (let meme of memes) {
      expect(
        await screen.findByRole('img', { name: meme.title }),
      ).toHaveAttribute('src', meme.image.url)
    }
  })

  it('should show error text when api fails', async () => {
    server.use(
      rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )

    render(<App />)

    const errorElement = await screen.findByText(errorMessage500)
    expect(errorElement).toBeInTheDocument()
  })

  it('should show tags', async () => {
    const memeExample: Meme = {
      id: 'adfasdfewrwerfdsgfsdg',
      title: 'Mememcio',
      image: {
        width: '200',
        height: '112',
        url:
          'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      },
      date: new Date('2012-02-30'),
      tags: ['#movie', '#brazil', '#brazil the movie'],
    }

    render(<MemeList memes={[memeExample]} />)
    for (let tag of memeExample.tags) {
      const memeTagText = await screen.findByText(tag)
      expect(memeTagText).toBeInTheDocument()
    }
  })
})

describe('Search  memes', () => {
  // it('should search with words up 3 characters', async () => {
  //   render(<App />)
  //   const input = await screen.getByRole('textbox', { name: /searchmeme/i })
  //   fireEvent.change(input, { target: { value: '23' } })
  //   const errorElement = await screen.findByText(
  //     errorMessageAtLeast4Characteres,
  //   )
  //   expect(errorElement).toBeInTheDocument()
  // })
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import memes from './fixtures/memes.json'
import { server } from './mocks/server'
import { rest } from 'msw'
import { Meme } from './core/domain/meme/Meme'
import MemeList from './ui/components/MemeList'

const apiBaseUrl = 'http://localhost:3001/api'
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
    const error = {
      message: 'Se ha producido un error',
    }
    server.use(
      rest.get(apiBaseUrl + '/memes', (req, res, ctx) =>
        res(ctx.status(500), ctx.json(error)),
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
  it('should show author if exist if not show tags', async () => {
    const memes: Meme[] = [
      {
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
      },
      {
        id: 'sfdgdfrtwe',
        title: 'Mememcio',
        image: {
          width: '200',
          height: '112',
          url:
            'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
        },
        date: new Date('2012-02-30'),
        tags: ['#movie', '#brazil', '#brazil the movie'],
        user: {
          avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
          banner_image:
            'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          profile_url: 'https://giphy.com/msnbc/',
          username: 'msnbc',
          display_name: 'MSNBC',
          is_verified: true,
        },
      },
    ]

    server.use(
      rest.get(apiBaseUrl + '/memes', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(memes)),
      ),
    )
    render(<App />)
    const memeAutor = await screen.findByText('msnbc')
    const incrediblesPosterImg = screen.getByAltText(
      'Imagen de perfil del Author del meme',
    )
    const memeTags = await screen.findByText('#movie')

    expect(memeAutor).toBeInTheDocument()
    expect(incrediblesPosterImg).toBeInTheDocument()
    expect(memeTags).toBeInTheDocument()
  })

  it('should show author', async () => {
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
      user: {
        avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
        banner_image: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        profile_url: 'https://giphy.com/msnbc/',
        username: 'msnbc',
        display_name: 'MSNBC',
        is_verified: true,
      },
    }

    render(<MemeList memes={[memeExample]} />)
    const username = memeExample.user?.username ?? ''
    const memeTagText = await screen.findByText(username)
    expect(memeTagText).toBeInTheDocument()
  })
})

describe('Search  memes', () => {
  it('should search with words up 3 characters i pass 2', async () => {
    const memes: Meme[] = [
      {
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
      },
      {
        id: 'sfdgdfrtwe',
        title: 'Mememcio',
        image: {
          width: '200',
          height: '112',
          url:
            'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
        },
        date: new Date('2012-02-30'),
        tags: ['#movie', '#brazil', '#brazil the movie'],
        user: {
          avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
          banner_image:
            'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          profile_url: 'https://giphy.com/msnbc/',
          username: 'msnbc',
          display_name: 'MSNBC',
          is_verified: true,
        },
      },
    ]
    const errorObject = {
      message: 'La longitud mínima de búsqueda debe de ser 3 carácteres',
    }
    server.use(
      rest.get(apiBaseUrl + '/memes', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(memes)),
      ),
      rest.get(apiBaseUrl + '/memes/as', (req, res, ctx) =>
        res(ctx.status(401), ctx.json(errorObject)),
      ),
    )
    render(<App />)

    const inputSearcher = await screen.getByRole('buscadorDeMemes')
    fireEvent.change(inputSearcher, { target: { value: 'as' } })

    const buttonSearcher = await screen.getByRole('buttonSearcher')
    fireEvent.click(buttonSearcher)
    const errorElement = await screen.findByText(
      'La longitud mínima de búsqueda debe de ser 3 carácteres',
    )
    expect(errorElement).toBeInTheDocument()
  })

  it('should search with words up 3 characters i pass movie', async () => {
    const memencioMiguelo = {
      id: 'adfasdfewrwerfdsgfsdg',
      title: 'Mememcio Miguelo',
      image: {
        width: '200',
        height: '112',
        url:
          'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      },
      date: new Date('2012-02-30'),
      tags: ['#movie', '#brazil', '#brazil the movie'],
    }
    const memes: Meme[] = [
      memencioMiguelo,
      {
        id: 'sfdgdfrtwe',
        title: 'Mememcio',
        image: {
          width: '200',
          height: '112',
          url:
            'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
        },
        date: new Date('2012-02-30'),
        tags: ['#moviea', '#brazil', '#brazil the movie'],
        user: {
          avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
          banner_image:
            'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
          profile_url: 'https://giphy.com/msnbc/',
          username: 'msnbc',
          display_name: 'MSNBC',
          is_verified: true,
        },
      },
    ]
    const errorObject = {
      message: 'La longitud mínima de búsqueda debe de ser 3 carácteres',
    }
    server.use(
      rest.get(apiBaseUrl + '/memes', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(memes)),
      ),
      rest.get(apiBaseUrl + '/memes/movie', (req, res, ctx) =>
        res(ctx.status(200), ctx.json([memencioMiguelo])),
      ),
    )
    render(<App />)

    const inputSearcher = await screen.getByRole('buscadorDeMemes')
    fireEvent.change(inputSearcher, { target: { value: 'movie' } })

    const buttonSearcher = await screen.getByRole('buttonSearcher')
    fireEvent.click(buttonSearcher)

    const memeTagText = await screen.findByText('Mememcio Miguelo')
    expect(memeTagText).toBeInTheDocument()
  })
})

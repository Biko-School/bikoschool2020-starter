import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import db from './db.json'
import { server } from './mocks/server'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'


describe('Listado de memes', () => {

  it('should show a list of memes', async () => {
    render(<App />)
    const sliced = db.memes.slice(0, 2)

    let idx = 0
    for (let element of sliced) {
      const meme = await screen.findByRole('img', { name: element.title + '-' + idx })
      expect(meme).toBeInTheDocument()
      expect(meme).toHaveAttribute(
        'src',
        element.images.original.url,
      )
      idx++
    }

  })

  it('Should call the api', async () => {

    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const meme = await screen.findAllByRole('img')
    expect(window.fetch).toBeCalledWith('http://localhost:3333/api/memes')
  })

  it('Should not send query if search is less than 3 characters', async () => {

    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const buscador = await screen.findByRole('textbox', { name: "Qué quieres buscar" })
    userEvent.type(buscador, 'ho')
    expect(window.fetch).not.toBeCalledWith('http://localhost:3333/api/memes?search=ho')
  })

  it('Should search memes if 3 or more characters are typed', async () => {
    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const buscador = await screen.findByRole('textbox', { name: "Qué quieres buscar" })
    userEvent.type(buscador, 'homer')
    expect(window.fetch).toBeCalledWith('http://localhost:3333/api/memes?search=homer')
  })

  it('Should show meme tags on meme card', async () => {
    const meme = {
      "id": "YleuWir5NTNVXkflSp",
      "type": "gif",
      "slug": "moodman-movie-brazil-the-YleuWir5NTNVXkflSp",
      "giphyUrl": "https://giphy.com/gifs/moodman-movie-brazil-the-YleuWir5NTNVXkflSp",
      "title": "Movie Brazil GIF by MOODMAN",
      "source_tld": "",
      "source_post_url": "",
      "import_datetime": "2020-08-20 02:24:22",
      "username": "",
      "images": {
        "original": {
          "width": "480",
          "height": "269",
          "url": "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif"
        },
        "small": {
          "width": "200",
          "height": "112",
          "url": "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif"
        }
      },
      "tags": ["#movie"]
    }
    server.use(
      rest.get('http://localhost:3333/api/memes', (_, res, ctx) =>
        res(ctx.status(200), ctx.json([meme])),
      ),
    )
    render(<App />)

    // #movie, ** ...
    for(const tag of meme.tags){
      expect(await screen.findByText(tag, {exact: false})).toBeInTheDocument()
    }
  })
})

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import memes from './fixtures/memes.json'
import { server } from './mocks/server'
import { rest } from 'msw'

const errorMessage500 = 'Se ha producido un error'

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

describe('Search box', () => {
  it('should have a search input', async () => {
    render(<App />)

    const inputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })

    expect(inputElement).toBeInTheDocument()

    await screen.findByText('Movie Brazil GIF by MOODMAN')
  })

  it('should have search button disabled with words with less than 2 characters', async () => {
    render(<App />)

    const inputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })

    //TODO probar con esto: funciona el getByRole por nombre del componente en vez de alt, aria-label...
    // userEvent.type(screen.getByRole('searchbox'), 'movie')
    fireEvent.change(inputElement, { target: { value: 'ca' } })
    const buttonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    expect(buttonElement).toHaveAttribute('disabled')

    await screen.findByText('Movie Brazil GIF by MOODMAN')
  })

  it('should have search button enabled with words with more than 2 characters', async () => {
    render(<App />)

    const inputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    fireEvent.change(inputElement, { target: { value: 'cat' } })

    const buttonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    expect(buttonElement).not.toHaveAttribute('disabled')

    await screen.findByText('Movie Brazil GIF by MOODMAN')
  })
})

describe('Search  memes by same tag', () => {
  it('should retrieve the memes that have the tag aab', async () => {
    render(<App />)

    //Escribir en el input aab
    const inputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    fireEvent.change(inputElement, {
      target: { value: encodeURIComponent('aab') },
    })

    //Clickar el boton
    const buttonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })
    fireEvent.click(buttonElement)

    //Ver si se ha cargado la imagen del meme con el tag "abb"
    expect(
      await screen.findByRole('img', {
        name: 'Movie Brazil GIF by MOODMAN',
      }),
    ).toHaveAttribute(
      'src',
      'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
    )

    //Y que no está el otro
    expect(
      screen.queryByRole('img', {
        name: 'Dance Dancing GIF by MOODMAN',
      }),
    ).toBeNull()
  })
})

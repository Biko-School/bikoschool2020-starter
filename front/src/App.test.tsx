import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import Memes from './fixtures/dbSampleMemes.json'
import { server } from './mocks/server'
import { rest } from 'msw'

describe('listado de memes', () => {
  test('muestra un listado de memes', async () => {
    render(<App />)

    for (let memeItem of Memes) {
      const meme = await screen.findByRole('img', {
        name: memeItem.title,
      })

      expect(meme).toHaveAttribute('src', memeItem.url)
    }
  })

  test('hace una llamada a la api', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)

    await screen.findAllByRole('img')

    expect(fetch).toBeCalledWith(process.env.REACT_APP_API_BASE_URL + '/memes')
  })

  test('muestra mensaje de error si la api no devuelve lo esperado', async () => {
    server.use(
      rest.get(
        process.env.REACT_APP_API_BASE_URL + '/memes',
        (req, res, ctx) => {
          return res(ctx.status(500))
        },
      ),
    )
    render(<App />)

    expect(await screen.findByText('Error')).toBeInTheDocument()
  })
})

describe('busqueda de memes', () => {
  test('llama a la api con el texto buscado', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)

    const searchBox = screen.getByRole('textbox', { name: /buscar/i })
    userEvent.type(searchBox, 'lol')
    expect(searchBox).toHaveValue('lol')

    const searchButton = screen.getByRole('button', { name: /búsqueda/i })
    userEvent.click(searchButton)

    expect(fetch).toBeCalledWith(
      process.env.REACT_APP_API_BASE_URL + '/memes?search=lol',
    )

    await screen.findByRole('img', {
      name: /Season 2 Slow Clap GIF by CBS All Access/i,
    })
  })

  test('si la longitud de la busqueda es menor de 3 da error', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)
    await screen.findByRole('img', {
      name: /Brazil/i,
    })
    const searchBox = screen.getByRole('textbox', { name: /buscar/i })

    const searchButton = screen.getByRole('button', { name: /búsqueda/i })

    userEvent.type(searchBox, 'lo')
    userEvent.click(searchButton)

    await waitFor(() => {
      expect(fetch).not.toBeCalledWith(
        process.env.REACT_APP_API_BASE_URL + '/memes?search=' + 'lo',
      )
    })
  })

  test('muestra los memes que devuelve la busqueda', async () => {
    render(<App />)
    const searchBox: HTMLInputElement = screen.getByRole('textbox', {
      name: /buscar/i,
    }) as HTMLInputElement
    const searchButton = screen.getByRole('button', { name: /búsqueda/i })

    await screen.findAllByRole('img')

    userEvent.type(searchBox, 'lol')
    userEvent.click(searchButton)

    await waitFor(async () => {
      const memes = await screen.findAllByRole('img', {
        name: /Season 2 Slow Clap GIF by CBS All Access/i,
      })
      expect(memes).toHaveLength(1)
    })
  })
})

describe('login', () => {
  test('llama a la api para hacer login', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)
    const textbox = screen.getByLabelText('usuario')

    const button = screen.getByRole('button', { name: /entrar/i })

    const example_username = 'user1'
    userEvent.type(textbox, example_username)
    expect(textbox).toHaveValue(example_username)

    userEvent.click(button)

    expect(fetch).toBeCalledWith(
      process.env.REACT_APP_API_BASE_URL + '/login?user=' + example_username,
    )
  })
})

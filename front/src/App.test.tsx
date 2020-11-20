import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import Memes from './memes.json'
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
  test.skip('muestra un campo de busqueda y un botón', async () => {
    render(<App />)

    await screen.findByRole('img', { name: 'Funny Gif Lol GIF by MOODMAN' })
    expect(screen.findByRole('textbox')).toBeInTheDocument()
    expect(screen.findByRole('button')).toBeInTheDocument()
  })

  test.skip('llama a la api con el texto buscado', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)
    const textbox: HTMLInputElement = screen.getByRole(
      'textbox',
    ) as HTMLInputElement

    const button = screen.getByRole('button')

    // fireEvent.change(textbox, { target: { value: 'lol' } })
    userEvent.type(textbox, 'lol')
    expect(textbox.value).toBe('lol')

    // fireEvent.click(button)
    userEvent.click(button)

    expect(fetch).toBeCalledWith(
      process.env.REACT_APP_API_BASE_URL + '/memes?search=lol',
    )
  })

  test.skip('si la longitud de la busqueda es menor de 3 da error', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)
    const textbox: HTMLInputElement = screen.getByRole(
      'textbox',
    ) as HTMLInputElement

    const button = screen.getByRole('button')

    // fireEvent.change(textbox, { target: { value: 'lo' } })
    // fireEvent.click(button)
    userEvent.type(textbox, 'lo')
    userEvent.click(button)

    expect(fetch).not.toBeCalledWith(
      process.env.REACT_APP_API_BASE_URL + '/memes?search=' + textbox.value,
    )
  })

  test('muestra los memes que devuelve la busqueda', async () => {
    render(<App />)
    const textbox: HTMLInputElement = screen.getByRole(
      'textbox',
    ) as HTMLInputElement
    const button = screen.getByRole('button')

    await screen.findAllByRole('img')

    userEvent.type(textbox, 'lol')
    userEvent.click(button)

    // screen.debug()
    await waitFor(async () => {
      const memes = await screen.findAllByRole('img')
      expect(memes).toHaveLength(2)
    })
  })
})

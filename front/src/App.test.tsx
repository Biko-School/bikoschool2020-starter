import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

    expect(fetch).toBeCalledWith('http://localhost:3000/api/memes')
  })

  test('muestra mensaje de error si la api no devuelve lo esperado', async () => {
    server.use(
      rest.get('http://localhost:3000/api/memes', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    render(<App />)

    expect(await screen.findByText('Error')).toBeInTheDocument()
  })
})

describe('busqueda de memes', () => {
  test('muestra un campo de busqueda y un botón', async () => {
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('llama a la api con el texto buscado', async () => {
    const fetch = jest.spyOn(window, 'fetch')
    render(<App />)
    const textbox: HTMLInputElement = screen.getByRole(
      'textbox',
    ) as HTMLInputElement

    const button = screen.getByRole('button')

    fireEvent.change(textbox, { target: { value: 'lol' } })
    expect(textbox.value).toBe('lol')
    fireEvent.click(button)

    expect(fetch).toBeCalledWith('http://localhost:3000/api/memes?search=lol')
  })
})

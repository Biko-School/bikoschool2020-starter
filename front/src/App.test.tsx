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
  test.skip('muestra un campo de busqueda y un botón', async () => {
    render(<App />)
    expect(
      screen.getByRole('textbox', {
        name: /busqueda/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /buscar/i,
      }),
    ).toBeInTheDocument()
  })

  //test('permite hacer una busqueda')
})

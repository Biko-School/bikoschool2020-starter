import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '../Home'
import memes from '../../../../fixtures/memes.json'
import { server } from '../../../../mocks/server'
import { rest } from 'msw'
import { BrowserRouter } from 'react-router-dom'

describe('List of memes', () => {
  it('should show memes from the API', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    for (let meme of memes) {
      const imageElement = await screen.findByRole('img', { name: meme.title })
      expect(imageElement).toBeInTheDocument()
      expect(imageElement).toHaveAttribute('src', meme.image_url)
    }
  })

  it('should show the tags of the meme when it does not have user info', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    const memeWithoutUserInfo = memes[0]

    const memeWithUserImageElement = await screen.findByRole('img', {
      name: memeWithoutUserInfo.title,
    })

    expect(memeWithUserImageElement).toBeInTheDocument()

    for (let tag of memeWithoutUserInfo.tags) {
      expect(screen.getByTestId(memeWithoutUserInfo.id)).toHaveTextContent(tag)
    }
  })

  it('should show user avatar and name of the meme when it has user info', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    const memeWithUserInfo = memes[1]

    const memeWithUserImageElement = await screen.findByRole('img', {
      name: memeWithUserInfo.title,
    })

    expect(memeWithUserImageElement).toBeInTheDocument()
    expect(screen.getByTestId(memeWithUserInfo.id)).toHaveTextContent(
      memeWithUserInfo.user!.name,
    )
    expect(screen.getByTestId(memeWithUserInfo.id)).toContainElement(
      await screen.findByRole('img', {
        name: memeWithUserInfo.user?.name,
      }),
    )
  })

  it('should show an error text if the request fail', async () => {
    server.use(
      rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    )

    render(<Home />, { wrapper: BrowserRouter })

    const errorElement = await screen.findByText(
      'Se ha producido un error al obtener los memes mas recientes',
    )
    expect(errorElement).toBeInTheDocument()
  })
})

describe('Search memes', () => {
  it('should have a search input and button', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    expect(searchInputElement).toBeInTheDocument()
    expect(searchButtonElement).toBeInTheDocument()

    // Meter esto para  que no salte el error "Can't perform a React state update on an unmounted component"
    const imageElement = await screen.findByRole('img', {
      name: 'Movie Brazil GIF by MOODMAN',
    })
    expect(imageElement).toBeInTheDocument()
  })

  it('should have search button enabled only with words with more than 2 characters', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })
    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })

    expect(searchButtonElement).toHaveAttribute('disabled')
    fireEvent.change(searchInputElement, { target: { value: 'ca' } })
    expect(searchButtonElement).toHaveAttribute('disabled')
    fireEvent.change(searchInputElement, { target: { value: 'cat' } })
    expect(searchButtonElement).not.toHaveAttribute('disabled')

    const imageElement = await screen.findByRole('img', {
      name: 'Movie Brazil GIF by MOODMAN',
    })
    expect(imageElement).toBeInTheDocument()
  })

  it('should show an error text if the search filter do not have a minimum length of 3 characters, ignoring side spaces and interior spaces greater than 1', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    userEvent.type(searchInputElement, ' #f ')
    userEvent.click(searchButtonElement)

    const errorElement = await screen.findByText(
      'La longitud del termino de busqueda debe ser mayor de 2 caracteres',
    )
    expect(errorElement).toBeInTheDocument()
  })

  it('should ignore in the input search side spaces and interior spaces greater than 1 ', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    jest.spyOn(window, 'fetch')

    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    userEvent.type(searchInputElement, ' #fo  o ')
    userEvent.click(searchButtonElement)

    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/memes/search?filter=${encodeURIComponent(
        '#fo o',
      )}`,
    )
  })

  it('should show the memes of the search from the API', async () => {
    render(<Home />, { wrapper: BrowserRouter })

    jest.spyOn(window, 'fetch')

    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    userEvent.type(searchInputElement, '#foo')
    userEvent.click(searchButtonElement)

    expect(window.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/memes/search?filter=${encodeURIComponent(
        '#foo',
      )}`,
    )

    const memeWithSearchedCriteriaImageElement = await screen.findByRole(
      'img',
      {
        name: 'Movie Brazil GIF by MOODMAN',
      },
    )
    const memeWithoutSearchedCriteriaImageElement = screen.queryByRole('img', {
      name: 'Best Friends Dog GIF by GIPHY Studios Originals',
    })

    expect(memeWithSearchedCriteriaImageElement).toBeInTheDocument()
    expect(memeWithoutSearchedCriteriaImageElement).not.toBeInTheDocument()
  })

  it('should show an error text if the search request fail', async () => {
    server.use(
      rest.get('http://localhost:3001/api/memes/search', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    render(<Home />, { wrapper: BrowserRouter })

    const searchInputElement = screen.getByRole('textbox', {
      name: /qué quieres buscar/i,
    })
    const searchButtonElement = screen.getByRole('button', {
      name: /comenzar búsqueda/i,
    })

    userEvent.type(searchInputElement, '#foo')
    userEvent.click(searchButtonElement)

    const errorElement = await screen.findByText(
      'Se ha producido un error al realizar la búsqueda de los memes',
    )
    expect(errorElement).toBeInTheDocument()
  })
})

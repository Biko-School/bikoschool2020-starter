import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from '../../mocks/server'
import { rest } from 'msw'
import { Search } from './Search'
import searchResultMovie from '../../fixture/search_movie.json'
import { renderWithProviders } from '../../testUtils'

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useParams: () => ({ searchTerm: "movie" }),
    }
});
afterEach(() => {
    jest.clearAllMocks();
  });
  
describe('Search memesSearch memes', () => {
    it('Should show the results from user search', async () => {
      renderWithProviders(<Search />)

      for (const meme of searchResultMovie.memes) {
        const image = await screen.findByRole('img', { name: meme.title })
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', meme.url)
      }
    })
    it('should show message error if the request with movie term fail', async () => {
      server.use(
        rest.get('http://localhost:5000/api/memes/search', (req, res, ctx) => {
          return res(ctx.status(500))
        }),
      )
      renderWithProviders(<Search />)
      expect(await screen.findByRole('alert')).toHaveTextContent('Oops!')
    })
    it('should notice when there are no search results', async () => {
      server.use(
        rest.get('http://localhost:5000/api/memes/search', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ memes: [] }))
        }),
      )
      renderWithProviders(<Search />)

      expect(
        await screen.findByText(
          `Memes no encontrados para la búsqueda movie`,
        ),
      ).toBeInTheDocument()
    })
  })
  
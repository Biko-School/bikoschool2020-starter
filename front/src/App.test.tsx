import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from './mocks/server'
import { rest } from 'msw'
import App from './App'
import { Meme } from './models/Meme'
import { memes } from './fixture/recent.json'
import searchResultMovie from './fixture/search_movie.json'
import { renderWithProviders } from './testUtils'

describe('App', () => {
  it('Should render home page ', async () => {
    renderWithProviders(<App />)

    expect(
      await screen.findByText(/Los guif mas trending del momento/i),
    ).toBeInTheDocument()
  })
})

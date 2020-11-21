import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, history } from '../../../testUtils'
import { Header } from './Header'

describe('Header', () => {
  it('should can return home page when user click in logo', () => {
    history.push = jest.fn()
    renderWithProviders(<Header />)

    userEvent.click(screen.getByText(/Guifaffinity/i))

    expect(history.push).toBeCalledWith('/')
  })
})

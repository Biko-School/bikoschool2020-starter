import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from './SearchBox'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Search Box', () => {
  it('should search if user presses enter', () => {
    render(<SearchBox />)

    userEvent.type(screen.getByRole('searchbox'), 'movie{enter}')

    expect(mockHistoryPush).toBeCalledWith('/search/movie')
  })

  it('search button should be disabled when search term has less than three characters', () => {
    render(<SearchBox />)
    const button = screen.getByRole('button', { name: 'Search' })
    const searchBox = screen.getByRole('searchbox')

    userEvent.type(searchBox, '12')
    expect(button).toHaveAttribute('disabled')

    userEvent.type(searchBox, '3')
    expect(button).not.toHaveAttribute('disabled')
  })

  it('when empty search should redirect to home page', () => {
    render(<SearchBox />)

    userEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(mockHistoryPush).toBeCalledWith('/')
  })
})

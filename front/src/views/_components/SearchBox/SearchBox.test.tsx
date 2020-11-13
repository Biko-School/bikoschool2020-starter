import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from './SearchBox'

describe('Search Box', () => {
  it('should search if user presses enter', () => {
    const onSearch = jest.fn()
    render(<SearchBox onSearch={onSearch} />)

    userEvent.type(screen.getByRole('searchbox'), 'movie{enter}')

    expect(onSearch).toBeCalledWith('movie')
  })

  it('search button should be disabled when search term has less than three characters', () => {
    const onSearch = jest.fn()
    render(<SearchBox onSearch={onSearch} />)

    const button = screen.getByRole('button', { name: 'Search' })
    const searchBox = screen.getByRole('searchbox')

    expect(button).toHaveAttribute('disabled')

    userEvent.type(searchBox, '12')
    expect(button).toHaveAttribute('disabled')

    userEvent.type(searchBox, '3')
    expect(button).not.toHaveAttribute('disabled')
  })
})

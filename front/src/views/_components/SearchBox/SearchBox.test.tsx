import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from './SearchBox'

describe('Search Box', () => {
  it('should search if user presses enter', () => {
    const onSearch = jest.fn()
    render(<SearchBox onSearch={onSearch} />)

    userEvent.type(screen.getByRole('searchbox'), 'movie{enter}')

    expect(onSearch).toBeCalledWith('movie')
  })
})

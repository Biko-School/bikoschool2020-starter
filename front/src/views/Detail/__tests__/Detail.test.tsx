import React from 'react'
import { screen, render } from '@testing-library/react'
import { Detail } from '../Detail'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'

describe('Detail of a meme', () => {
  it('should show the detail of the meme', async () => {
    render(
      <MemoryRouter initialEntries={['/memes/YleuWir5NTNVXkflSp']}>
        <Route path="/memes/:id">
          <Detail />
        </Route>
      </MemoryRouter>,
    )

    const memeTitleElement = await screen.findByText(
      'Movie Brazil GIF by MOODMAN',
    )
    const memeImageElement = await screen.findByRole('img', {
      name: 'Movie Brazil GIF by MOODMAN',
    })

    expect(memeTitleElement).toBeInTheDocument()
    expect(memeImageElement).toBeInTheDocument()
    expect(memeImageElement).toHaveAttribute(
      'src',
      'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif',
    )
  })
})

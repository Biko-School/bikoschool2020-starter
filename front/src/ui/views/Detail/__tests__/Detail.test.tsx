import React from 'react'
import { screen, render } from '@testing-library/react'
import { Detail } from '../Detail'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
import memeDetailWithUser from '../../../../fixtures/memeDetailWithUser.json'

describe('Detail of a meme', () => {
  it('should show the detail of the meme without user', async () => {
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
    for (let tag of ['#movie', '#brazil', '#brazil the movie']) {
      const tagTextElement = await screen.findByText(tag)
      expect(tagTextElement).toBeInTheDocument()
    }
  })

  it('should show the detail of the meme with user', async () => {
    render(
      <MemoryRouter initialEntries={['/memes/XEbIyyo02CsFyDmFXL']}>
        <Route path="/memes/:id">
          <Detail />
        </Route>
      </MemoryRouter>,
    )

    const memeTitleElement = await screen.findByText(memeDetailWithUser.title)
    const memeImageElement = await screen.findByRole('img', {
      name: memeDetailWithUser.title,
    })
    const userNameElement = await screen.findByText(
      memeDetailWithUser.user.name,
    )
    const userAvatarImageElement = await screen.findByRole('img', {
      name: memeDetailWithUser.user.name,
    })

    expect(memeTitleElement).toBeInTheDocument()
    expect(memeImageElement).toBeInTheDocument()
    expect(memeImageElement).toHaveAttribute(
      'src',
      memeDetailWithUser.image.url,
    )
    for (let tag of memeDetailWithUser.tags) {
      const tagTextElement = await screen.findByText(tag)
      expect(tagTextElement).toBeInTheDocument()
    }

    expect(userNameElement).toBeInTheDocument()
    expect(userAvatarImageElement).toBeInTheDocument()
    expect(userAvatarImageElement).toHaveAttribute(
      'src',
      memeDetailWithUser.user.avatar_url,
    )
  })
})

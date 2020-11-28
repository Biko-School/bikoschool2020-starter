import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import MemeList from '../../../../ui/components/MemeList'
import { Meme } from '../../../domain/meme/Meme'
import { BrowserRouter as Router } from 'react-router-dom'

describe('List of memes', () => {
  it('should show tags', async () => {
    const memeExample: Meme = {
      id: 'adfasdfewrwerfdsgfsdg',
      title: 'Mememcio',
      image: {
        width: '200',
        height: '112',
        url:
          'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      },
      date: new Date('2012-02-30'),
      tags: ['#movie', '#brazil', '#brazil the movie'],
    }

    render(
      <Router>
        <MemeList memes={[memeExample]} />
      </Router>,
    )
    for (let tag of memeExample.tags) {
      const memeTagText = await screen.findByText(tag)
      expect(memeTagText).toBeInTheDocument()
    }
  })

  it('should show author', async () => {
    const memeExample: Meme = {
      id: 'adfasdfewrwerfdsgfsdg',
      title: 'Mememcio',
      image: {
        width: '200',
        height: '112',
        url:
          'https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif',
      },
      date: new Date('2012-02-30'),
      tags: ['#movie', '#brazil', '#brazil the movie'],
      user: {
        avatar_url: 'https://media3.giphy.com/avatars/msnbc/mXVglEI3DxZc.jpg',
        banner_image: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        banner_url: 'https://media3.giphy.com/headers/msnbc/dIBctX1oryXc.gif',
        profile_url: 'https://giphy.com/msnbc/',
        username: 'msnbc',
        display_name: 'MSNBC',
        is_verified: true,
      },
    }

    render(
      <Router>
        <MemeList memes={[memeExample]} />
      </Router>,
    )
    const username = memeExample.user?.username ?? ''
    const memeTagText = await screen.findByText(username)
    expect(memeTagText).toBeInTheDocument()
  })
})

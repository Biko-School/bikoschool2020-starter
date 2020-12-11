import MemeDetailComponent, { MemeDetail } from './MemeDetail'
import MockMemeDetail from '../../../fixtures/dbSampleMemeDetail.json'

import * as memeDetailService from '../../../services/getMemeDetail'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('meme detail', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('muestra título, imagen y nombre de usuario del meme', async () => {
    const expectedMemeDetail: MemeDetail = {
      id: 'irrelevant',
      title: MockMemeDetail.title,
      url: MockMemeDetail.url,
      width: 0,
      height: 0,
      user_avatar_url: MockMemeDetail.user_avatar_url,
      user_display_name: MockMemeDetail.user_display_name,
      tags: MockMemeDetail.tags,
    }

    const fetch = jest
      .spyOn(memeDetailService, 'getMemeDetail')
      .mockResolvedValue(expectedMemeDetail)

    render(<MemeDetailComponent idMeme={MockMemeDetail.id} />)
    const meme = await screen.findByRole('img', {
      name: MockMemeDetail.title,
    })
    expect(meme).toHaveAttribute('src', MockMemeDetail.url)

    const userAvatar = await screen.findByRole('img', {
      name: MockMemeDetail.user_display_name,
    })
    expect(userAvatar).toHaveAttribute('src', MockMemeDetail.user_avatar_url)

    const memeTitle = await screen.findByText(MockMemeDetail.title)
    expect(memeTitle).toBeInTheDocument()
  })

  test('muestra tags de meme detalle', async () => {
    const expectedMemeDetail: MemeDetail = {
      id: 'irrelevant',
      title: MockMemeDetail.title,
      url: MockMemeDetail.url,
      width: 0,
      height: 0,
      user_avatar_url: MockMemeDetail.user_avatar_url,
      user_display_name: MockMemeDetail.user_display_name,
      tags: MockMemeDetail.tags,
    }
    const fetch = jest
      .spyOn(memeDetailService, 'getMemeDetail')
      .mockResolvedValue(expectedMemeDetail)

    render(<MemeDetailComponent idMeme={MockMemeDetail.id} />)

    for (let tag of MockMemeDetail.tags) {
      const t = await screen.findByText(tag)
      expect(t).toBeInTheDocument()
    }
  })
})

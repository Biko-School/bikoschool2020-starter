import MockMemeDetail from '../fixtures/dbSampleMemeDetail.json'
import { getMemeDetail } from './getMemeDetail'
import * as handlers from '../mocks/handlers'

describe('meme detail', () => {
  test('hace una llamada a la api para el detalle del meme', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: async () => MockMemeDetail,
      } as Response),
    )

    const fetch = jest.spyOn(window, 'fetch')

    const getMemeDetailResult = await getMemeDetail(MockMemeDetail.id)

    expect(fetch).toBeCalledWith(
      process.env.REACT_APP_API_BASE_URL + '/meme?id=' + MockMemeDetail.id,
    )
    // console.log(getMemeDetailResult)
  })
})

import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';
import {memes} from './fixtures/memes.json'
import singleMeme from './fixtures/memeGet.json'
import memesSearch from './fixtures/memes.search.json'
import userEvent from '@testing-library/user-event';
import { server } from './mocks/server'
import { rest } from 'msw'

describe('renders learn react link', () => {

  it("Muestra varios memes, en el mismo orden que el de las variables que se reciben", async () =>{
    render(<App />)

    for (let i = 0; i < memes.length; i++) {
      let meme = await screen.findByRole("img",{'name':memes[i].title})
      expect(meme).toHaveAttribute("alt",memes[i].title)
      expect(meme).toHaveAttribute("src",memes[i].url)
    }
    let listMemesHeader = await screen.findByText("Los gif más trending del momento")
    expect(listMemesHeader).toBeInTheDocument()
  })

  it('muestra un error al pasarle 2 o menos caracteres de búsqueda', async function(){
    render(<App />)
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search,'ho')
    userEvent.click(screen.getByRole('button',{name:'search'}))
    const error = await screen.findByText('El texto de búsqueda necesita ser mayor que dos caracteres')     
    expect(error).toBeInTheDocument()
  })

  it('realiza la busqueda', async function(){
    render(<App/>)
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search, 'funny')
    userEvent.click(screen.getByRole('button', {name: "search"}))
    for (let i = 0; i < memesSearch.memes.length; i++) {
      let meme = await screen.findByRole('img',{'name' : memesSearch.memes[i].title})
      expect(meme).toHaveAttribute("alt",memesSearch.memes[i].title)
      expect(meme).toHaveAttribute("src",memesSearch.memes[i].url)
    }
  })

  it('Ver detalle del meme', async function(){
    server.use(
      rest.get('/api/memes', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(singleMeme)),
      ),
    )

    render(<App/>)
    userEvent.click(await screen.findByRole('img',{'name': singleMeme.memes[0].title}))

    const memeTitle = await screen.findByText(singleMeme.memes[0].title)
    const memeImage = await screen.findByRole('img',{'name':singleMeme.memes[0].title})
    for(let i = 0; i<singleMeme.memes[0].tags.length; i++){
      let memeTag = await screen.findByText(singleMeme.memes[0].tags[i])
      expect(memeTag).toBeInTheDocument()
    }
    expect(memeTitle).toBeInTheDocument()
    expect(memeImage).toBeInTheDocument()
  })
})



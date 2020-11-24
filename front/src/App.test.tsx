import React from 'react';
import { fireEvent, render,screen } from '@testing-library/react';
import App from './App';
import {memes} from './fixtures/memes.json'
import memesSearch from './fixtures/memes.search.json'
import userEvent from '@testing-library/user-event';
import { server } from './mocks/server'
import { rest } from 'msw'
import { Meme } from './core/domain/Meme/Meme';
describe('renders learn react link', () => {

  it("Muestra varios memes, en el mismo orden que el de las variables que se reciben", async () =>{
    render(<App />)

    for (let i = 0; i < memes.length; i++) {
      let meme = await screen.findByRole("img",{name:memes[i].title})
      expect(meme).toHaveAttribute("alt",memes[i].title)
      expect(meme).toHaveAttribute("src",memes[i].url)
    }
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
      let meme = await screen.findByRole("img",{name:memesSearch.memes[i].title})
      expect(meme).toHaveAttribute("alt",memesSearch.memes[i].title)
      expect(meme).toHaveAttribute("src",memesSearch.memes[i].url)
    }
  })

  it('Ver detalle del meme', async function(){
    const meme : Meme = {
        "title": "Jimmy Fallon Nod GIF by The Tonight Show Starring Jimmy Fallon",
        "url": "https://media1.giphy.com/media/u47skgWgE6E2ejacaR/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif",
        "tags": [
          "#hey",
        ]
    }
    server.use(
      rest.get('/api/memes', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(meme)),
      ),
    )
    render(<App/>)
    userEvent.click(screen.getByRole('meme', {name: "meme"}))

    const memeTitle = await screen.findByText('Jimmy Fallon Nod GIF by The Tonight Show Starring Jimmy Fallon')

    expect(memeTitle).toBeInTheDocument()
  })
})



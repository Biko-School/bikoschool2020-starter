import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';
import memes from './fixtures/memes.json'
import memesSearch from './fixtures/memes.search.json'
import userEvent from '@testing-library/user-event';

describe('renders learn react link', () => {

  it("Muestra varios memes, en el mismo orden que el de las variables que se reciben", async () =>{
    render(<App />)

    for (let i = 0; i < memes.length; i++) {
      let meme = await screen.findByRole("img",{name:memes[i].title})
      expect(meme).toHaveAttribute("alt",memes[i].title)
      expect(meme).toHaveAttribute("src",memes[i].url)
    }
  })

  it.skip('muestra un error al pasarle 2 o menos caracteres de búsqueda', function(){
    render(<App />)
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search,'ho')
    userEvent.click(screen.getByRole('button',{name:'search'}))
    const error =  screen.getByText('El texto de búsqueda necesita ser mayor que dos caracteres')     
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
})



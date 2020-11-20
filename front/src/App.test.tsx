import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';
import {memes} from '../src/test.json'
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

  it('muestra un error al pasarle 2 o menos caracteres de búsqueda', function(){
    render(<App />)
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search,'ho')
    userEvent.click(screen.getByRole('button',{name:'search'}))
    const error =  screen.getByText('El texto de búsqueda necesita ser mayor que dos caracteres')     
    expect(error).toBeInTheDocument()
  })

  it('con busqueda correcta realiza la busqueda', async function(){
    render(<App/>)
    jest.spyOn(window, 'fetch')
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search, 'hom')
    userEvent.click(screen.getByRole('button', {name: "search"}))
    expect(window.fetch).toBeCalledWith('post','http://127.0.0.1/api/memes')
  })
})



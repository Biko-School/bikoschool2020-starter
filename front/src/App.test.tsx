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

  it('devuelve error al pasarle 2 caracteres de búsqueda', function(done){
    render(<App />)

    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search,'ho')

    userEvent.click(screen.getByRole('button',{name:'search'}))

    
           
    expect(screen.getByText('El texto de búsqueda necesita ser mayor que dos caracteres')).toBeVisible()
  })
})



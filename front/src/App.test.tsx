import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';
import {memes} from '../src/test.json'
import userEvent from '@testing-library/user-event';

let responseSearchExample = { 
  "memes": [
    {
        "title": "Movie Brazil GIF by MOODMAN",
        "url": "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif",
        "tags": ["#movie", "#brazil", "#brazil the movie","#funny"]
    },
    {
        "title": "Funny Gif Lol GIF by MOODMAN",
        "url": "https://media1.giphy.com/media/l5DePfMmB09ZVkh3Af/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif",
        "tags": ["#funny", "#hilarious", "#lol", "#funny gif"]
    }
  ]
}

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
    jest.spyOn(window,"fetch").mockResolvedValue({ ok: true, json: async () => responseSearchExample} as Response)
    render(<App/>)
    const search = screen.getByRole('textbox',{name:"search"})
    userEvent.type(search, 'funny')
    userEvent.click(screen.getByRole('button', {name: "search"}))
    expect(window.fetch).toBeCalledWith('/api/memes/search')
    for (let i = 0; i < responseSearchExample.memes.length; i++) {
      let meme = await screen.findByRole("img",{name:responseSearchExample.memes[i].title})
      expect(meme).toHaveAttribute("alt",responseSearchExample.memes[i].title)
      expect(meme).toHaveAttribute("src",responseSearchExample.memes[i].url)
    }
  })
})



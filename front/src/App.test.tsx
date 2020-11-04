import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import db from './db.json'
import userEvent from '@testing-library/user-event'


describe('Listado de memes', () => {

  it('should show a list of memes', async () => {
    render(<App />)
    const sliced = db.memes.slice(0, 2)

    for(let element of sliced){
      const meme = await screen.findByRole('img', { name: element.title })
      expect(meme).toBeInTheDocument()
      expect(meme).toHaveAttribute(
        'src',
        element.images.original.url,
      )
    }

  })

  it('Should call the api', async () => {

    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const meme = await screen.findAllByRole('img')
    expect(window.fetch).toBeCalledWith('http://127.0.0.1/api/memes')
  })

  it('Should not send query if search is less than 3 characters', async() => {
    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const buscador = await screen.findByRole('textbox', {name: "Qué quieres buscar"})
    userEvent.type(buscador, 'ho')
    expect(window.fetch).not.toBeCalledWith('http://127.0.0.1/api/memes?query=ho')
  })

  it('Should search memes if 3 or more characters are typed', async() => {
    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const buscador = await screen.findByRole('textbox', {name: "Qué quieres buscar"})
    userEvent.type(buscador, 'homer')
    expect(window.fetch).toBeCalledWith('http://127.0.0.1/api/memes?query=homer')
  })

})

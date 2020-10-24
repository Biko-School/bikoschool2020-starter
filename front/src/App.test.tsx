import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import db from './db.json'
import userEvent from '@testing-library/user-event'


describe('Listado de memes', () => {

  it('should show a list of memes', async () => {
    render(<App />)

    db.memes.slice(0, 2).forEach( async element => {
      const meme = await screen.findByRole('img', { name: element.title })
      expect(meme).toBeInTheDocument()
      expect(meme).toHaveAttribute(
        'src',
        element.images.original.url,
      )
    });
  })

  it('Should call the api', async () => {
    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const meme = await screen.findAllByRole('img')
    expect(window.fetch).toBeCalledWith('/api/memes')
  })

  it('Should only search memes with 3 or more characteres', async() => {
    jest.spyOn(window, 'fetch') // Fase de arrange
    render(<App />)
    const buscador = await screen.findByRole('input', {name: 'Qué quieres buscar'})
    userEvent.type(buscador, 'ho')
    expect(window.fetch).not.toBeCalledWith('/api/memes')
  })

})

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import recentMemes from './mocks/recents.json';
import apiUrl from '../services/api-url';

describe('Listado de memes más recientes', () => {
  it('Renderiza todos los memes de un listado predefinido', async () => {
    render(<App />);
    for (let meme of recentMemes.memes) {
      let img = await screen.findByRole('img', { name: meme.title });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', meme.url);
    }
  });
});

describe('Búsqueda de memes por etiquetas', () => {
  it('Realiza una búsqueda', async () => {
    const fetch = jest.spyOn(window, 'fetch');

    render(<App />);
    const input = screen.getByPlaceholderText(/buscar/i);
    const button = screen.getByRole('link', { name: /buscar/i });
    userEvent.type(input, 'homer');
    userEvent.click(button);

    let imgs = await screen.findAllByRole('img');
    console.log(imgs);
    let img = await screen.findByRole('img', {
      name: 'search-homer-title-1',
    });
    expect(img).toHaveAttribute('src', 'search-homer-url-1');
    img = await screen.findByRole('img', {
      name: 'search-homer-title-2',
    });
    expect(img).toHaveAttribute('src', 'search-homer-url-2');

    expect(fetch).toBeCalledWith(apiUrl.recentMemes());
    expect(fetch).toBeCalledWith(apiUrl.searchMemes('homer'));
  });
});

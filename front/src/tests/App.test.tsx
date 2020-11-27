import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { MemeDetailComponent } from '../views/meme-detail/meme-detail';
import recentMemes from './mocks/recents.json';
import { aMeme, aMemeDetail } from './mocks/builders';
import { MemeThumb } from '../dtos/MemeThumb';
import { MemeDetail } from '../dtos/MemeDetail';

const apiUrl = process.env.REACT_APP_DEV_API;

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
  it('Término de búsqueda válido devuelve resultadoss', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar/i);
    userEvent.type(input, 'homer{enter}');

    expect(
      await screen.findByRole('img', {
        name: 'search-homer-title-1',
      }),
    ).toHaveAttribute('src', 'search-homer-url-1');
    expect(
      await screen.findByRole('img', {
        name: 'search-homer-title-2',
      }),
    ).toHaveAttribute('src', 'search-homer-url-2');
  });

  it('Muestra error al usar término de búsqueda inferior a 3 caracteres haciendo click en el botón', async () => {
    const fetch = jest.spyOn(window, 'fetch');
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar/i);
    userEvent.type(input, 'ho{enter}');

    let msg = await screen.findByText(
      /La búsqueda no puede contener menos de 3 caracteres/i,
    );
    expect(msg).toBeInTheDocument();
    expect(fetch).not.toBeCalledWith(`${apiUrl}/search/ho`);
  });

  it('El botón de ejecutar búsqueda lanza correctamente la búsqueda', () => {
    const fetch = jest.spyOn(window, 'fetch');
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar/i);
    userEvent.type(input, 'homer');
    const button = screen.getByRole('link', { name: /buscar/i });
    userEvent.click(button);

    expect(fetch).toBeCalledWith(`${apiUrl}/search/homer`);
  });

  it('Avisa con un mensaje si el término de búsqueda no coincide con ningún meme', async () => {
    const fetch = jest.spyOn(window, 'fetch');
    render(<App />);

    const input = screen.getByPlaceholderText(/buscar/i);
    userEvent.type(input, 'empty{enter}');

    expect(await screen.findByText(/No hay resultados/i)).toBeInTheDocument();
    expect(fetch).toBeCalledWith(`${apiUrl}/search/empty`);
  });
});

describe('Renderiza los detalles de un meme', () => {
  it.only('Muestra el titulo del meme', async () => {
    const meme: MemeDetail = aMemeDetail('1')
      .withTitle('Best friends dog GIF')
      .withUrl('http://google.com')
      .withSize(200, 300)
      .withAuthor('GifMaster')
      .withTags(['Dog', 'Cute'])
      .build();

    render(<MemeDetailComponent />);

    expect(
      await screen.findByText(/Best friends dog GIF/i),
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import recentMemes from './mocks/recents.json';
import { rest } from 'msw';
import { server } from './mocks/server';

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

/*describe('Gestiona errores HTTP', () => {
  it('Error 500', async () => {
    server.use(
      rest.get('/api/memes', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<App />);
    expect(await screen.findByText('No se pudo cargar')).toBeInTheDocument();
  });
});*/

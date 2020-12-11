import { createApp } from '../app';
import request from 'supertest';
import { aMeme, aMemesRepo } from './builders';
import { doesNotMatch } from 'assert';

expect.extend({
  toMatchMemeIds(memes, expectedIds: string[], ordered = false) {
    const expectedIdsJson = JSON.stringify(expectedIds);
    const receivedIdsJson = JSON.stringify(memes?.map((meme) => meme.id));
    const returnFail = (msg: string) => {
      return {
        message: () => msg,
        pass: false,
      };
    };
    const returnPass = (notMsg: string) => {
      return {
        message: () => notMsg,
        pass: true,
      };
    };

    if (memes.length !== expectedIds.length) {
      return returnFail(
        `Expected ${expectedIds.length} memes with IDs ${expectedIdsJson}, got ${receivedIdsJson}`,
      );
    }

    for (let i = 0; i < memes.length; i++) {
      if (ordered && memes[i].id !== expectedIds[i]) {
        return returnFail(
          `Expected memes IDs order  was ${expectedIdsJson}, got ${receivedIdsJson}`,
        );
      } else if (!expectedIds.includes(memes[i].id)) {
        return returnFail(
          `Expected ${expectedIds.length} memes with IDs ${expectedIdsJson}, got ${receivedIdsJson}`,
        );
      }
    }

    return returnPass(`Expected memes IDs not to be ${expectedIds}`);
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchMemeIds(expectedIds: string[], ordered?: boolean): R;
    }
  }
}

describe('/api/memes', () => {
  it('/api/memes devuelve 200-OK con una lista de elementos', (done) => {
    const memesRepo = aMemesRepo().fromJSON('./db.test.json');
    const app = createApp(memesRepo);
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toBeInstanceOf(Array);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve 50 elementos', (done) => {
    const memesRepo = aMemesRepo().fromJSON('./db.test.json');
    const app = createApp(memesRepo);
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toHaveLength(50);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve objeto con campos "title", "url" y "id"', (done) => {
    const memesRepo = aMemesRepo().fromJSON('./db.test.json');
    const app = createApp(memesRepo);
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes[0]).toHaveProperty('title');
        expect(res.body.memes[0]).toHaveProperty('id');
        expect(res.body.memes[0]).toHaveProperty('url');
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve los memes ordenados por fecha descendente', (done) => {
    const memes = [
      aMeme('1').withDate('2020-08-20 02:24:22').build(),
      aMeme('2').withDate('2017-04-11 17:28:33').build(),
      aMeme('3').withDate('2020-08-28 20:47:12').build(),
      aMeme('4').withDate('2016-08-12 00:06:52').build(),
      aMeme('5').withDate('2020-08-26 22:20:43').build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    const expectedIds = ['3', '5', '1', '2', '4'];
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['3', '5', '1', '2', '4'], true);
        /*for (let i = 0; i < res.body.memes.length; i++) {
          expect(res.body.memes[i].id).toEqual(expectedIds[i]);
        }*/
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve los memes más recientes', (done) => {
    const memes = [
      aMeme('1').withDate('2020-08-20 02:24:22').build(),
      aMeme('2').withDate('2017-04-11 17:28:33').build(),
      aMeme('3').withDate('2020-08-28 20:47:12').build(),
      aMeme('4').withDate('2016-08-12 00:06:52').build(),
      aMeme('5').withDate('2020-08-26 22:20:43').build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo, { numRecentMemes: 3 });
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['1', '3', '5']);
        done(); // termina el test asíncrono de jest
      });
  });
});

describe('/api/search', () => {
  it('El término de búsqueda debe contener al menos 3 carateres', (done) => {
    const memesRepo = aMemesRepo().fromMemory([]);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/aa')
      .expect(422)
      .then((res) => {
        expect(res.text).toEqual(
          'El término de búsqueda debe contener al menos 3 caracteres.',
        );
        done(); // termina el test asíncrono de jest
      });
  });

  it('Devuelve memes con etiquetas que coincidan completamente con el término de búsqueda', (done) => {
    const memes = [
      aMeme('1').withTags(['bart']).build(),
      aMeme('2').withTags(['homer']).build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/homer')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['2']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('Devuelve memes con etiquetas que coincidan parcialmente con el término de búsqueda', (done) => {
    const memes = [
      aMeme('1').withTags(['bart']).build(),
      aMeme('2').withTags(['homer']).build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/hom')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['2']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('Devuelve lista vacía de memes si no coincide ninguna etiqueta con el término de búsqueda', (done) => {
    const memes = [
      aMeme('1').withTags(['bart']).build(),
      aMeme('2').withTags(['homer']).build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/lisa')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds([]);
        done(); // termina el test asíncrono de jest
      });
  });

  it('No devuelve memes cuya etiqueta coincide parcialmente con el término de búsqueda (solo lo hace a la inversa)', (done) => {
    const memes = [
      aMeme('1').withTags(['bart']).build(),
      aMeme('2').withTags(['homer']).build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/homero')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds([]);
        done(); // termina el test asíncrono de jest
      });
  });

  it('Normaliza espacios en blanco del término de búsqueda', (done) => {
    const memes = [aMeme('1').withTags(['homer simpson']).build()];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/   homer %09 \n  \t simpson ')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['1']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('La búsqueda es insensible a mayúsculas y minúsculas', (done) => {
    const memes = [aMeme('1').withTags(['homer simpson']).build()];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/Homer Simpson')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['1']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('Devuelve los resultados ordenados por fecha descendente', (done) => {
    const memes = [
      aMeme('1')
        .withDate('2020-08-20 02:24:22')
        .withTags(['bart simpson'])
        .build(),
      aMeme('2')
        .withDate('2020-08-28 20:47:12')
        .withTags(['homer simpson'])
        .build(),
      aMeme('3')
        .withDate('2020-08-26 22:20:43')
        .withTags(['marge simpson'])
        .build(),
    ];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/search/simpson')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['2', '3', '1'], true);
        done(); // termina el test asíncrono de jest
      });
  });
});

describe('Detalle de meme /api/meme/:memeid', () => {
  it('Devuelve los detalles del meme que coincide con la id', (done) => {
    const memes = [aMeme('1').build(), aMeme('2').build()];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/meme/2')
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual('2');
        done(); // termina el test asíncrono de jest
      });
  });

  it('Devuelve mensaje de error si el id pasado como parámetro no coincide con ningún meme', (done) => {
    const memes = [aMeme('1').build()];
    const memesRepo = aMemesRepo().fromMemory(memes);
    const app = createApp(memesRepo);
    request(app)
      .get('/api/meme/999999999999')
      .expect(404)
      .then((res) => {
        expect(res.text).toEqual('El meme no existe');
        done();
      });
  });
});

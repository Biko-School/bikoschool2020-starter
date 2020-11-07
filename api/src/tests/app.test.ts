import { createApp } from '../app';
import request from 'supertest';
import Lowdb from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
import { DbSchema, MemeDb } from '../dbSchema';
import dbDefaultData from './db.test.json';
import { aDbSchema, aMemeDb } from './builders';

expect.extend({
  toMatchMemeIds(memes, expectedIds: string[]) {
    let error = memes.length !== expectedIds.length;
    memes.forEach((respMeme) => {
      if (!expectedIds.includes(respMeme.id)) {
        error = true;
      }
    });
    if (error) {
      return {
        message: () =>
          `Expected ${expectedIds.length} memes with IDs ${JSON.stringify(
            expectedIds,
          )}, got ${JSON.stringify(memes)}`,
        pass: false,
      };
    }
    return {
      message: () => `expected memes IDs not to be ${expectedIds}`,
      pass: true,
    };
  },
});

describe('/api/memes', () => {
  it('/api/memes devuelve 200-OK con una lista de elementos', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(dbDefaultData).write();

    const app = createApp(db);
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toBeInstanceOf(Array);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve 50 elementos', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(dbDefaultData).write();

    const app = createApp(db);
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toHaveLength(50);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve objeto con campos "title", "url" y "id"', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(dbDefaultData).write();

    const app = createApp(db);
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
      aMemeDb('1').withDate('2020-08-20 02:24:22').build(),
      aMemeDb('2').withDate('2017-04-11 17:28:33').build(),
      aMemeDb('3').withDate('2020-08-28 20:47:12').build(),
      aMemeDb('4').withDate('2016-08-12 00:06:52').build(),
      aMemeDb('5').withDate('2020-08-26 22:20:43').build(),
    ];
    const memesDb = aDbSchema().withMemes(memes).build();
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(memesDb).write();

    const app = createApp(db);
    const expectedIds = ['3', '5', '1', '2', '4'];
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        for (let i = 0; i < res.body.memes.length; i++) {
          expect(res.body.memes[i].id).toEqual(expectedIds[i]);
        }
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve los memes más recientes', (done) => {
    const memes = [
      aMemeDb('1').withDate('2020-08-20 02:24:22').build(),
      aMemeDb('2').withDate('2017-04-11 17:28:33').build(),
      aMemeDb('3').withDate('2020-08-28 20:47:12').build(),
      aMemeDb('4').withDate('2016-08-12 00:06:52').build(),
      aMemeDb('5').withDate('2020-08-26 22:20:43').build(),
    ];
    const memesDb = aDbSchema().withMemes(memes).build();
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(memesDb).write();

    const app = createApp(db, { numRecentMemes: 3 });
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
  it('/api/search devuelve 422 - Unprocessable entity y el mensaje "La búsqueda debe contener al menos 3 caracteres." si la búsqueda contiene menos de 3 carateres', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    const app = createApp(db);
    db.defaults(dbDefaultData).write();
    request(app)
      .get('/api/search/a')
      .expect(422)
      .then((res) => {
        expect(res.text).toEqual(
          'La búsqueda debe contener al menos 3 caracteres.',
        );
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/search devuelve 200-OK si la búsqueda contiene 3 o más carateres', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    const app = createApp(db);
    db.defaults(aDbSchema().build()).write();
    request(app)
      .get('/api/search/aaa')
      .expect(200)
      .then(() => {
        done();
      });
  });

  it('/api/search devuelve memes con etiquetas que coincidan completamente con el término de búsqueda', (done) => {
    const memes = [
      aMemeDb('1').withTags(['bart', 'simpson', 'bart simpson']).build(),
      aMemeDb('2').withTags(['burns', 'señor Burns']).build(),
      aMemeDb('3').withTags(['homer', 'simpson', 'homer simpson']).build(),
      aMemeDb('4').withTags(['sr. quitanieves', 'homer']).build(),
      aMemeDb('5').withTags(['marge', 'simpson', 'marge simpson']).build(),
    ];
    const memesDb = aDbSchema().withMemes(memes).build();
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(memesDb).write();

    const app = createApp(db);
    request(app)
      .get('/api/search/homer')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['3', '4']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/search devuelve memes que cuya búsqueda coincide parcialmente con alguna etiqueta', (done) => {
    const memes = [
      aMemeDb('1').withTags(['bart', 'simpson', 'bart simpson']).build(),
      aMemeDb('2').withTags(['burns', 'señor Burns']).build(),
      aMemeDb('3').withTags(['homer', 'simpson', 'homer simpson']).build(),
      aMemeDb('4').withTags(['sr. quitanieves', 'homer']).build(),
      aMemeDb('5').withTags(['marge', 'simpson', 'marge simpson']).build(),
    ];
    const memesDb = aDbSchema().withMemes(memes).build();
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(memesDb).write();

    const app = createApp(db);
    request(app)
      .get('/api/search/simp')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds(['1', '3', '5']);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/search devuelve lista vacía de memes si no coincide ninguna etiqueta con el término de búsqueda', (done) => {
    const memes = [
      aMemeDb('1').withTags(['bart', 'simpson', 'bart simpson']).build(),
      aMemeDb('2').withTags(['burns', 'señor Burns']).build(),
      aMemeDb('3').withTags(['homer', 'simpson', 'homer simpson']).build(),
      aMemeDb('4').withTags(['sr. quitanieves', 'homer']).build(),
      aMemeDb('5').withTags(['marge', 'simpson', 'marge simpson']).build(),
    ];
    const memesDb = aDbSchema().withMemes(memes).build();
    const db = Lowdb(new Memory<DbSchema>(''));
    db.defaults(memesDb).write();

    const app = createApp(db);
    request(app)
      .get('/api/search/lisa')
      .expect(200)
      .then((res) => {
        expect(res.body.memes).toMatchMemeIds([]);
        done(); // termina el test asíncrono de jest
      });
  });
});

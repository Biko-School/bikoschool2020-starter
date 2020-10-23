import { createApp } from '../app';
import request from 'supertest';
import Lowdb from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
import FileSync from 'lowdb/adapters/FileSync';
import { DbSchema } from '../dbSchema';
import dbDefaultData from './db.test.json';

describe('/api/memes', () => {
  it('/api/memes devuelve 200-OK con una lista de elementos', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    const app = createApp(db);
    db.defaults(dbDefaultData).write();
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve 50 elementos', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    const app = createApp(db);
    db.defaults(dbDefaultData).write();
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(50);
        done(); // termina el test asíncrono de jest
      });
  });

  it('/api/memes devuelve objeto con campos "title", "url" y "id"', (done) => {
    const db = Lowdb(new Memory<DbSchema>(''));
    const app = createApp(db);
    db.defaults(dbDefaultData).write();
    request(app)
      .get('/api/memes')
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('url');
        done(); // termina el test asíncrono de jest
      });
  });
});

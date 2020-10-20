import { app } from "./app";
import request from "supertest";

describe("/api/memes", () => {
  it("/api/memes devuelve 200-OK con una lista de elementos", (done) => {
    request(app)
      .get("/api/memes")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        done(); // termina el test asíncrono de jest
      });
  });

  it("/api/memes devuelve 50 elementos", (done) => {
    request(app)
      .get("/api/memes")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(50);
        done(); // termina el test asíncrono de jest
      });
  });
});

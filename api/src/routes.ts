import express from "express";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { DbSchema } from "./dbSchema";

const adapter = new FileSync<DbSchema>("../material/db.json");
const db = lowdb(adapter);

const router = express.Router();

router.get("/memes", function (req, res) {
  res.status(200).json(db.get("memes").take(50).value());
});

export default router;

import express, { Request, Response } from 'express'
export const router = express.Router()

router.get('/memes', (req, res) => {
  res.status(200).json([])
})

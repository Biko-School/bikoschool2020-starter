import express, { Request, Response, Router } from 'express'
import logger from 'morgan'

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('./db/db.json')
const db = low(adapter)


const routes = Router()

routes.use('/memes', (req, res) => {
    res.status(200)
    res.send(db.get('memes'))
})

export default routes
import Router from 'express'
import low from 'lowdb/lib/fp'
import FileSync from 'lowdb/adapters/FileSync'
import { concat, find, sortBy, take, random } from 'lodash/fp'

export const routes = Router()

const adapter = new FileSync('./db/db.json')
const db = low(adapter)
const defaultValue = []
const memes = db('memes',defaultValue)

routes.get('/memes',function(req,res){
    res.status(200).send(memes([take(50)]))
})
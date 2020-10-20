import Router from 'express'

export const routes = Router()

routes.get('/memes',function(req,res){
    res.status(200).send(new Array(50))
})
import Router from 'express'

export const routes = Router()

// will handle any request that ends in /events
// depends on where the router is "use()'d"
routes.get('/memes', function (req, res, next) {
  res.send([]).sendStatus(200)
})

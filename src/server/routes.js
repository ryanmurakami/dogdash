const db = require('./data/dynamo.js')

function init (app) {
  app.get('/', (req, res) => res.send('Hello World!'))
  app.get('/dog/:dogId', async (req, res) => {
    const dog = await db.get(req.params.dogId)
    res.send(dog)
  })
}

module.exports = {
  init
}
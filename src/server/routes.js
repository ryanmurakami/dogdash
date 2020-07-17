const db = require('./data/dynamo.js')

function init (app) {
  app.get('/', indexHandler)
  app.get('/dog/:dogId', async (req, res) => {
    const dog = await db.get(req.params.dogId)
    res.send(dog)
  })
}

async function indexHandler (req, res) {
  const dynamoStatus = await db.test()
  const dynaMessage = dynamoStatus.connected
    ? 'connected'
    : `not connected. ${dynamoStatus.error}`
  res.send(`Hello from DogDash. Dynamo is ${dynaMessage}.`)
}

module.exports = {
  init
}
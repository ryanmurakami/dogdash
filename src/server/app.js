const express = require('express')
const routes = require('./routes')

const port = 3000
const app = express()

routes.init(app)

app.listen(port, () => console.log(`Dogdash listening at http://localhost:${port}`))
const express = require('express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()

// Routers
app.use('/api/user', user)

app.listen(config.api.port, () => {
  console.log(`Api escuchando http://localhost:${config.api.port}`, )
})
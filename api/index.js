const express = require('express')
const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
// const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

const swaggerDocument = require('./swagger.json')

// Routers
app.use('/api/user', user)
app.use('/api/auth', auth)
// app.use('/api/post', post)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errors)

app.listen(config.api.port, () => {
  console.log(`Api escuchando http://localhost:${config.api.port}`)
})

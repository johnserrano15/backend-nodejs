const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', (req, res, next) => {
  controller.list()
  .then((lista) => {
    response.success(req, res, lista, 200)
  })
  .catch(next)
})

router.get('/following', secure('follow'), (req, res, next) => {
  controller.following(req.user.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
})

router.post('/follow/:id', secure('follow'), (req, res, next) => {
  controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  controller.get(req.params.id)
  .then((user) => {
    response.success(req, res, user, 200)
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  controller.upsert(req.body)
  .then((user) => {
    // console.log(user)
    response.success(req, res, `Created ${user.username || 'user'}`, 201)
  })
  .catch(next)
})

router.put('/', secure('update'), (req, res, next) => {
  controller.upsert(req.body)
  .then((user) => {
    response.success(req, res, `Updated ${user.username || 'user'}`, 201)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  controller.remove(req.params.id)
  .then(() => {
    response.success(req, res, 'Deleted', 200)
  })
  .catch(next)
})

module.exports = router

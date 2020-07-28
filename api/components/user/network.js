const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => {
  controller.list()
  .then((lista) => {
    response.success(req, res, lista, 200)
  })
  .catch(err => {
    response.error(req, res, err, 500)
  })
})

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
  .then((user) => {
    response.success(req, res, user, 200)
  })
  .catch(err => {
    response.error(req, res, err, 500)
  })
})

router.post('/', (req, res) => {
  controller.upsert(req.body)
  .then((user) => {
    // console.log(user)
    response.success(req, res, `Created ${user.username || 'user'}`, 201)
  })
  .catch(err => {
    response.error(req, res, err, 500)
  })
})

router.put('/', secure('update'), (req, res) => {
  controller.upsert(req.body)
  .then((user) => {
    response.success(req, res, `Updated ${user.username || 'user'}`, 201)
  })
  .catch(err => {
    response.error(req, res, err, 500)
  })
})

router.delete('/:id', (req, res) => {
  controller.remove(req.params.id)
  .then(() => {
    response.success(req, res, 'Deleted', 200)
  })
  .catch(err => {
    response.error(req, res, err, 500)
  })
})

module.exports = router

const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// Routes
router.get('/like', secure('logged'), postsLiked)
router.get('/', list)
router.get('/:id', getPost)
router.post('/', secure('owner'), upsert)
router.put('/', secure('owner'), upsert)
router.post('/:id/like', secure('logged'), like)

// functions
function list(req, res, next) {
  controller.list()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function getPost(req, res, next) {
  controller.get(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function upsert(req, res, next) {
  controller.upsert(req.body, req.user.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function postsLiked(req, res, next) {
  controller.upsert(req.body, req.user.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

function like(req, res, next) {
  controller.upsert(req.body, req.user.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = router

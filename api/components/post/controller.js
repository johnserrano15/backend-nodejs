const { nanoid } = require('nanoid')

const TABLA = 'post'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(TABLA)
  }

  function get(id) {
    return store.get(TABLA, id)
  }

  async function upsert(body, userId) {
    const post = {
      text: body.text,
      user: userId
    }

    if (body.id) {
      post.id = body.id
    } else {
      post.id = nanoid()
    }

    return store.upsert(TABLA, post)
  }

  function like (id, user) {
    return store.upsert(TABLA + '_like', {
      post_id: id,
      user_id: user
    })
  }

  function postsLiked (id) {
    const join = {}
    join[TABLA] = 'post_id' // { post: 'post_id' }
    const query = { user_id: id }

    return store.query(`${TABLA}_like`, query, join)
  }


  return {
    list,
    get,
    upsert,
    like,
    postsLiked
  }
}

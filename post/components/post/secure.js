const auth = require('../../../auth')

module.exports = function checkAuth(action) {

  function middleware(req, res, next) {
    switch(action) {
      case 'logged':
        auth.check.logged(req)
        next()
        break

      case 'owner':
        auth.check.logged(req)
        const owner = req.user.id
        auth.check.own(req, owner)
        next()
        break

      // case 'follow':
      //   auth.check.logged(req)
      //   next()
      //   break

      default:
        next()
    }
  }

  return middleware
}
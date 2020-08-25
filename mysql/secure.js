const auth = require('../auth')

module.exports = function checkAuth(action, data) {
  switch (action) {
    case 'logged':
      auth.check.logged(data)
      break

    default:
      break
  }
}

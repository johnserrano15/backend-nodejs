const AxiosInstance = require('../utils/axios-instance')
const config = require('../config')

class CacheRemote {
  constructor() {
    const host = config.cacheService.host
    const port = config.cacheService.port
    this.request = new AxiosInstance({
      baseURL: 'http://' + host + ':' + port,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  list(table) {
    return this.request.send(`/${table}`, 'GET')
  }

  get(table, id) {
    return this.request.send(`/${table}/${id}`, 'GET')
  }

  upsert(table, body) {
    return this.request.send(`/${table}`, 'POST', body)
  }
}

module.exports = new CacheRemote()

const axios = require('axios')

class AxiosInstance {
  constructor(config = {}) {
    this.axios = axios.create(config)
  }

  send(url, method, data) {
    return new Promise((resolve, reject) => {
      this.axios({
        method,
        url,
        data,
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}

module.exports = AxiosInstance

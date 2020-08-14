require('dotenv').config()

module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'nosecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'vyU7DCqzKX',
    password: process.env.MYSQL_PASS || 'hQ8gtxIQ9o',
    database: process.env.MYSQL_DB || 'vyU7DCqzKX',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
}

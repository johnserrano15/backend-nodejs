const mysql = require('mysql')

const config = require('../config')

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection

function handleCon() {
  connection = mysql.createConnection(dbconf)

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err)
      setTimeout(handleCon, 2000)
    } else {
      console.log('DB Connected!')
    }
  })

  connection.on('error', (err) => {
    console.error('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

handleCon()

function list(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data[0])
    })
  })
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

// function upsert(table, data, isNew) {
//   // console.log(data)
//   if (data && isNew) {
//     return insert(table, data)
//   } else {
//     return update(table, data)
//   }
// }

const upsert = async (table, payload) => {
  // console.log(table)
  // console.log(payload)
  new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [payload, payload],
      (error, data) => {
        console.log('UPDATE DATA: ', data)
        if (error) {
          return reject(error)
        }
        resolve(data)
      }
    )
  })
}

function query(table, query, join) {
  let joinQuery = ''
  // join = { user: 'user_to' }
  if (join) {
    const key = Object.keys(join)[0] // user, post
    const val = join[key] // user_to, post_id
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }
  // console.log(joinQuery)

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ?`,
      query,
      (err, res) => {
        if (err) return reject(err)
        if (res.length > 1) resolve(res || [])
        resolve(res[0] || null)
      }
    )
  })
}

module.exports = {
  list,
  get,
  upsert,
  query,
}

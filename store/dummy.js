const db = {
  'user': [
    { id: '1', name: 'John Serrano'}
  ]
}

async function list(tabla) {
  return db[tabla]
}

async function get(tabla, id) {
  let col = await list(tabla)
  // return col.filter(item => item.id === id)[0] || null
  return col.find(item => item.id === id) || null
}

async function upsert(tabla, data) {
  if(!db[tabla]) {
    db[tabla] = []
  }
  db[tabla].push(data)
  console.log(db)
  return data
}

async function remove(tabla, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}

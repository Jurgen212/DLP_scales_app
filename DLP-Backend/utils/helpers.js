require('dotenv').config()

const STATUS = process.env.STATUS

let baseUrl = ''

baseUrl = (STATUS === 'dev') ? 'http://localhost:3000/api' : (STATUS === 'prod') ? 'https://api.dlpbasculas.com/api' : '';


const message = {
  noPage: 'No hay nada aquí!',
  badParam: 'Hey! debes enviar un parámetro válido',
  badArray: 'Mal... mal array :/'
}

const collection = {
  exclude: '-_id -author -__v -edited',
  limit: 63,
  queries: {
    product: ['type', 'section', 'name'],
  },
}

module.exports = {
  baseUrl,
  message,
  collection,
}

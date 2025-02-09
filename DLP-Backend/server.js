require('dotenv').config()

const path = require('path')
const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const routes = require('./routes')

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/product/image', express.static(path.join(__dirname, 'images')))

app.use('/api', routes)

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log(
  '\x1b[34m%s\x1b[0m',
  `
  Database  → ${process.env.HOST}/${process.env.DB_NAME}
`,
))
.catch(err => console.log(err))

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(
    '\x1b[34m%s\x1b[0m',
    `
  ${app.get('env').toUpperCase()}
  REST      → https://api.dlpbasculas.com/api
  `,
  ),
)

module.exports = app

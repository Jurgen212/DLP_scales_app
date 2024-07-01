const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { collection } = require('../utils/helpers')

const { Schema } = mongoose

const productSchema = new Schema({
  id: Number,
  type: String,
  section: String,
  name: String,
  description: String,
  image: String,
  url: String,
  table: [
    {
      size: String,
      capacity: String,
    }
  ]

})

productSchema.statics.structure = (res) => {
  const sortSchema = ({ id, type, section, name, description, image, url, table }) => ({
    id,
    type,
    section,
    name,
    description,
    image,
    url,
    table
  })

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res)
}

productSchema.statics.findAndCount = async function ({ type, section, name, skip }) {
  const q = (key) => new RegExp(key && key.replace(/[^\w\s]/g, '\\$&'), 'i')

  const query = {
    type: q(type),
    section: q(section),
    name: q(name),
  }

  const [data, count] = await Promise.all([
    this.find(query).sort({ id: 1 }).select(collection.exclude).limit(collection.limit).skip(skip),
    this.find(query).countDocuments(),
  ])

  const results = this.structure(data)

  return { results, count }

}

productSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Product', productSchema)

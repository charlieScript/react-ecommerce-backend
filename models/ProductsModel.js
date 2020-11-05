const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: 0,
})

const Products = mongoose.model('product', productSchema)

module.exports = Products
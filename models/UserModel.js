const mongoose = require('mongoose')
const { isEmail } = require('validator')


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please an email address'],
    unique: true,
    validate: [
      isEmail,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
  cart: []
})

const User = mongoose.model('user', userSchema)

module.exports = User
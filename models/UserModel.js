const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please an email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
  },
  cart: [],
  index: {
    type: Number,
    default: 0
  }
});

// Password Hashing
userSchema.pre('save', async function (next) {
  // console.log('user is about to be created', this)

  // genarate a salt
  const salt = await bcrypt.genSalt();

  // 'this' refers to the user
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'charliescript', {
    expiresIn: maxAge,
  });
};

const userSignup = async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(401).send('an error occured');
    console.log(error);
  }
};

const userLogin = (req, res) => {};

const userLogout = (req, res) => {};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
};

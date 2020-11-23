const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const handleError = require('../helpers/errorChecker');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'charliescript', {
    expiresIn: maxAge,
  });
};

const userSignup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({
      email,
      username,
      password,
    });

    const token = createToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        cart: user.cart,
        index: user.index
      },
    });
  } catch (error) {
    const errorMessage = handleError(error);
    res.status(400).json(errorMessage);
    // console.log(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.findOne({ email });

    // if a user is found
    if (newUser) {
      // validate password
      const auth = await bcrypt.compare(password, newUser.password);
      // if user matched return user
      if (auth) {
        const token = jwt.sign({ id: newUser.id }, 'charliescript', {
          expiresIn: 3600,
        });
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 36000,
        });
        return res.status(200).json({
          token,
          user: {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email,
            cart: newUser.cart,
            index: newUser.index
          },
        });
      }
      // if password doesnt't match throw an error
      throw Error('Incorrect Password');
    }
    // if user is not found
    res.status(400).json({ msg: 'User not found' });
  } catch (error) {
    const errorMessage = handleError(error);
    res.status(400).json(errorMessage);
    // console.log(errorMessage);
  }
};

const getUserInfo = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json({ user }));
};

const addToCart = async (req, res) => {
  try {
    const cart = await User.findByIdAndUpdate(req.user.id, {
    cart: req.body
  }, { new: true}).select('cart')
  res.status(201).json(cart);

  } catch (error) {
  res.status(401).json({ msg: 'error adding to cart'});
    
  }
  

}

module.exports = {
  userSignup,
  userLogin,
  getUserInfo,
  addToCart
};

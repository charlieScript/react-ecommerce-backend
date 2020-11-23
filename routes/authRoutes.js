const express = require('express');
const {
  userLogin,
  userSignup,
  getUserInfo,
  addToCart
} = require('../controllers/userControllers');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/profile', auth, getUserInfo);

router.post('/profile/addtocart', auth, addToCart)

module.exports = router;

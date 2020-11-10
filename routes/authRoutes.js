const express = require('express');
const {userLogin, userLogout, userSignup } = require('../controllers/userControllers')

const router = express.Router();

router.post('/signup', userSignup)

router.post('/login', userLogin)

router.post('/logout', userLogout)


module.exports = router
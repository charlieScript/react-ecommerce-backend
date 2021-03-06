const express = require('express');
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
} = require('../controllers/productsControllers');
const { route } = require('./authRoutes');

const router = express.Router();

// GET GET ALL PRODUCTS
// ROUTE - PUBLIC
router.get('/products', getAllProducts);

router.post('/products/add', addProduct);

router.get('/products/:id', getSingleProduct);

module.exports = router;

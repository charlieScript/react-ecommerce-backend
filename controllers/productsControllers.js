const Products = require('../models/ProductsModel');

const getAllProducts = async (req, res) => {
  try {
    const product = await Products.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send('Can not get all products');
    console.log(error)
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const products = await Products.find()
    res.status(200).json(products[req.params.id])
  } catch (error) {
    res.status(400).send('can not get the product')
  }
}

const addProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body)
    res.status(201).send('A product was added')
  } catch (error) {
    res.status(400).send('an error occurred')
    console.log(error)
  }
}

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct
}

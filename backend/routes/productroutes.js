const express=require('express');
const { getProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const router= express.Router();

router.get('/',getProducts)
router.post('/',addProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

module.exports=router;

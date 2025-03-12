const express=require('express');
const { getOrders, placeOrder } = require('../controllers/orderController');
const router=express.Router();

router.get('/',getOrders)
router.post('/',placeOrder)

module.exports=router;
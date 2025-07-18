const express = require('express');
const { addtocart, removefromcart, getcart } = require('../controllers/cartcontroller');
const auth = require('../middleware/auth');

const cartrouter = express.Router();

cartrouter.post('/add', auth, addtocart);
cartrouter.post('/remove', auth, removefromcart);
cartrouter.get('/', auth, getcart); // Better RESTful convention

module.exports = cartrouter;

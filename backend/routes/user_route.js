const express = require('express');
const { loginuser, registeruser } = require('../controllers/usercontroller');

const user_route = express.Router();

user_route.post("/register", registeruser);
user_route.post("/login", loginuser);

module.exports = user_route; // ✅ CommonJS export

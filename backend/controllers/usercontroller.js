const UserModel = require('../models/usermodel');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { JWT_SECRET } = require('../utilities/config');

// Register user
const registeruser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: false, message: 'Invalid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ status: false, message: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ status: false, message: 'Passwords do not match' });
    }

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// Login user
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, message: 'Invalid credentials' });
    }

    const token = Jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({status: true, message: 'Login successful',user,token});
    // res.status(200).json({status: true, message: 'Login successful',user: {id: user._id, name: user.name, email: user.email},token});
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

module.exports = { loginuser, registeruser };

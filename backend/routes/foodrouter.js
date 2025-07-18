const express = require('express');
const { addfood,listFood, deleteFood} = require('../controllers/foodcontroller'); // ✅ Destructure correctly
const multer = require('multer');

const Foodrouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ✅ Correct use of cb and Date
  }
});

const upload = multer({ storage });

// Route to add food
Foodrouter.post('/add', upload.single('image'), addfood);
Foodrouter.get('/list',listFood);
Foodrouter.post('/delete',deleteFood);

module.exports = Foodrouter;

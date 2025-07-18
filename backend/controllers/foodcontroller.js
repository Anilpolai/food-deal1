const FoodModel = require('../models/foodmodel');
const fs = require('fs');


const addfood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: 'Image file is required' });
    }

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ status: false, message: 'Price must be a number' });
    }

    const image_filename = req.file.filename;

    const food = new FoodModel({
      name,
      description,
      price: parsedPrice,
      category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ status: true, message: 'Food added successfully', food });

  } catch (error) {
    console.error('❌ Error saving food:', error);
    res.status(500).json({ status: false, message: 'Failed to add food', error: error.message });
  }
};

const listFood = async (req,res)=>{
    try{
        const foods = await FoodModel.find({})
    res.status(201).json({ status: true,  foods });

    }
    catch(error){
        console.error('❌ Error saving food:', error);
    res.status(500).json({ status: false, message: 'not fund list', error: error.message });
    }
}

const deleteFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await FoodModel.findById(id);
    
    if (!food) {
      return res.status(404).json({ status: false, message: 'Food not found' });
    }

    // Delete the image file
    fs.unlink(`uploads/${food.image}`, err => {
      if (err) console.error("Error deleting image:", err);
    });

    await FoodModel.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to delete food', error: error.message });
  }
};




module.exports = { addfood , listFood, deleteFood };

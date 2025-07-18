const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

const connectdb = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connection successful");
  } catch (error) {
    if (error.name === "MongooseServerSelectionError") {
      console.log("❌ MongoDB Server is unreachable. Please check your internet or server status.");
    } else {
      console.log("❌ Database connection failed:", error.message);
    }
    process.exit(1);
  }
};

module.exports = connectdb;

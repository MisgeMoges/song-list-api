const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  });
};


module.exports = connectDB;

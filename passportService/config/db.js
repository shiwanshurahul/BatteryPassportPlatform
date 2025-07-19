const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_STRING);
    console.log("MongoDB connected for (Passport Service)");
  } 
  catch (err) {   //connection setup failed with DB with given string
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

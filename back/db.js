const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/proyecto_final';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error to connect to MongoDB', error);
  }
};

module.exports = connectDB;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iz3ay.mongodb.net/products_db?retryWrites=true&w=majority`

mongoose.connect(connectionString, { useUnifiedTopology: true ,  useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
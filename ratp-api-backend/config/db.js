require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;


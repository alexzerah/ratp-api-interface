require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://admin:admin@cluster0-r5sbz.mongodb.net/users?retryWrites=true&w=majority`;
console.log('V1')
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;


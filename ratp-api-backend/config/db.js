const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://admin:admin@cluster0-r5sbz.mongodb.net/users?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;


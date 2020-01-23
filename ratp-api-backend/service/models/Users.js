const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    favorites: {
        type: {
            metros: [{
                code: String,
                name: String,
                directions: String,
                id: String
            }]
            ,
            rers: [{
                code: String,
                name: String,
                directions: String,
                id: String
            }],
            tramways: [{
                code: String,
                name: String,
                directions: String,
                id: String
            }],
            buses: [{
                code: String,
                name: String,
                directions: String,
                id: String
            }],
            noctiliens: [{
                code: String,
                name: String,
                directions: String,
                id: String
            }]
        }
    }
});
// hash user password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('User', UserSchema);
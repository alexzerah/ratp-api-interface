//const jwt = require('jsonwebtoken');
//const passport = require('passport');
//const models = require('../../models/');
//const bcrypt = require('bcrypt-nodejs');
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.pong = function (req, res) {
    return res.send('pong');
}

exports.register = function (req, res, next) {
    userModel.create({ username: req.body.username, password: req.body.password }, function (err, result) {
        if (err)
            next(err);
        else {
            console.log(result)
            const token = jwt.sign({ username: result.username }, req.app.get('secretKey'));
            res.status(200).json({ token });
        }

    });
}

exports.login = function (req, res, next) {
    userModel.findOne({ username: req.body.username }, function (err, userInfo) {
        if (err) {
            next(err);
        } else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({ username: userInfo.username }, req.app.get('secretKey'));
                res.status(200).json({ token });
            } else {
                res.json({ status: "error", message: "Invalid username/password!!!", data: null });
            }
        }
    });
}

exports.postFavorites = (req, res, next) => {
    const authorization = req.header('authorization');
    if (authorization.startsWith('Bearer ')) {
        const token = authorization.slice(7, authorization.length).trimLeft();
        const { username } = jwt.decode(token);
        console.log(username)
        userModel.updateOne(
            { username },
            { $set: { favorites: req.body.favorites } },
            { upsert: true })
            .then((result, err) => {
                console.log(result)
                if (err) return res.send(500, { error: err });
                return res.status(200).send('Favorites succesfully updated.');
            });
    } else {
        return res.status(401).send({ error: 'You are not authorized.' });
    }

}

exports.getFavorites = (req, res, next) => {
    return
}
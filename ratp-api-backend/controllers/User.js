const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = function (req, res, next) {
    try {
        if (!req.body.username || !req.body.password) return res.status(400).json({ error: "Invalid body : {username/password}" });
        userModel.create({ username: req.body.username, password: req.body.password }, (err, result) => {
            if (err) next(err);
            else {
                const token = jwt.sign({ username: result.username }, req.app.get('secretKey'));
                return res.status(200).json({ token });
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.login = function (req, res, next) {
    try {
        if (!req.body.username) return res.status(400).json({ error: "Invalid body : {username/password}" });
        userModel.findOne({ username: req.body.username }, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
                console.log(userInfo)
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ username: userInfo.username }, req.app.get('secretKey'));
                    const favorites = userInfo.favorites || [];
                    return res.status(200).json({ token, favorites });
                } else {
                    return res.status(401).json({ error: "Invalid username/password!!!" });
                }
            }
        });
    } catch (error) {
        console.error(error)
    }
}

exports.postFavorites = (req, res, next) => {
    try {
        const authorization = req.header('authorization');
        if (authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length).trimLeft();
            const { username } = jwt.decode(token);
            userModel.updateOne(
                { username },
                { $set: { favorites: req.body.favorites } },
                { upsert: true })
                .then((result, err) => {
                    if (err) return res.send(500, { error: err });
                    return res.status(200).send('Favorites succesfully updated.');
                })
                .catch(error => {
                    return res.status(401).send({ error });
                });
        } else {
            return res.status(401).send({ error: 'You are not authorized.' });
        }
    } catch (error) {
        console.error(error)
    }
}

exports.getFavorites = (req, res, next) => {
    try {
        const authorization = req.header('authorization');
        if (authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length).trimLeft();
            const { username } = jwt.decode(token);
            userModel.findOne({ username }, (err, user) => {
                if (err) return res.send(500, { error: err });
                const favorites = user.favorites;
                return res.status(200).send(favorites);
            })
        } else {
            return res.status(401).send({ error: 'You are not authorized.' });
        }
    } catch (error) {
        console.error(error)
    }
}
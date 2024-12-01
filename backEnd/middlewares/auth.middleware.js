const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const BlackListToken = require('../models/blackListToken.model');

dotenv.config();

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const isBlacklisted = await BlackListToken.findOne({token});
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);

        req.user = user;
        return next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const isBlacklisted = await BlackListToken.findOne({token});
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decode._id);

        req.captain = captain;
        return next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = { authUser, authCaptain };
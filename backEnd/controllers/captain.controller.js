const captainModel = require('../models/captain.model');
const { createCaptain } = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListToken.model');

const registerCaptain = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { fullname, email, password, vehicle } = req.body;
        const { color, plate, capacity, vehicleType } = vehicle;
        const isEmailExist = await captainModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await createCaptain(
            fullname.firstname,
            fullname.lastname,
            email,
            hashedPassword,
            color,
            plate,
            capacity,
            vehicleType
        );

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const loginCaptain = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await captain.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token, captain });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (token) {
            await BlackListToken.create({ token });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
};

module.exports = { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile };
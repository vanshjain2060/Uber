const userModel = require('../models/user.model');
const { createUser } = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListToken.model');

const registerUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { fullname, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser(
            fullname.firstname,
            fullname.lastname,
            email,
            hashedPassword
        );

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error-handling middleware
    }
};

const loginUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        
        //setting cookies in the response
        res.cookie('token', token, { httpOnly: true });
        
        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        next(err); 
    }
}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}


const logoutUser = async (req, res, next) => {
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

module.exports = { registerUser, loginUser , getUserProfile, logoutUser };
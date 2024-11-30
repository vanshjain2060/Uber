const userModel = require('../models/user.model');
const { createUser } = require('../services/user.service');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { fullname, email, password } = req.body;

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

module.exports = { registerUser };
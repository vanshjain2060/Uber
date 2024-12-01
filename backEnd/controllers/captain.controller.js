const captainModel = require('../models/captain.model');
const { createCaptain } = require('../services/captain.service');
const { validationResult } = require('express-validator');

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

module.exports = { registerCaptain };
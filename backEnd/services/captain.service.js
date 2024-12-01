const captainModel = require('../models/captain.model');

const createCaptain = async (
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    const newCaptain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return newCaptain;
};

module.exports = { createCaptain };
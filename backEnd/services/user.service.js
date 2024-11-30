const userModel = require("../models/user.model");

const createUser = async (firstname, lastname, email, password) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    const newUser = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });
    return newUser;
};

module.exports = { createUser };
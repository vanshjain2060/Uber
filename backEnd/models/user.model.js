const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true, 
            minlenght: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlenght: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlenght: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
        type: String,
        default: ''
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
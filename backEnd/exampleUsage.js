
const mongoose = require('mongoose');
const { userModel } = require('./models/user.model');

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

async function createUserAndGenerateToken() {
    // Create a new user instance
    const user = new userModel({
        fullname: {
            firstname: 'John',
            lastname: 'Doe'
        },
        email: 'john.doe@example.com',
        password: await userModel.hashPassword('password123')
    });

    // Save the user to the database
    await user.save();

    // Generate auth token
    const token = user.generateAuthToken();
    console.log('Generated Token:', token);
}

createUserAndGenerateToken();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Uber Clone App!');
});
app.use("/users", userRoutes);


// Error Middleware to Handle unknow errors


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
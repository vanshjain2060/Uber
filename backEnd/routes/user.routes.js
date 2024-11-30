const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, getUserProfile } = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');


router.post("/register", [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginUser);

router.get("/profile", authUser, getUserProfile);

module.exports = router;
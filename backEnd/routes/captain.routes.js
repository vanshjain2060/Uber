const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile } = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post("/register", [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(['car', 'motorcycle', 'auto']).withMessage("Vehicle type must be car, motorcycle or auto")
], registerCaptain);

router.post("/login", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginCaptain);

router.post("/logout", authCaptain, logoutCaptain);

router.get("/profile", authCaptain, getCaptainProfile);

module.exports = router;
const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");

const { register, login, check } = require("../controller/userController");

router.post('/register', register);

router.post('/login', login);

router.get('/check',authmiddleware, check);

module.exports = router;
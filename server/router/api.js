const express = require('express')
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationCotrollerPolicy')

router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

router.post('/login',
    AuthenticationControllerPolicy.login,
    AuthenticationController.login)

module.exports = router
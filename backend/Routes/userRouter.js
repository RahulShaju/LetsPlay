const express = require('express')
const Router = express.Router()

const {registerUser,authUser} = require('../Controllers/userController')

Router.route('/register').post(registerUser)
Router.route('/login').post(authUser)

module.exports= Router 

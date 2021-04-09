const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")
const SmallScripts = require('../smallServerScripts/smallServerScripts')

class componentsController {

     getNav(req, res){
          const {user, token} = req.body
          
     }


}

module.exports = new componentsController()

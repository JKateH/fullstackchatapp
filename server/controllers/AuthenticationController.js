const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  }

module.exports = {
    register (req,res) {
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            const newUser = {
                email:req.body.email,
                password:hash,
            };
            User.create(newUser).then(()=>{
                res.json({
                    user:newUser,
                    token: jwtSignUser(newUser)
                })
            }).catch(error=>{
                res.status(400).send({
                    error: 'This email account is already in use.'
                })
            })
        })
        } ,
                        

    async login (req,res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                email: email
            })
            if (!user) {
              return res.status(403).send({
                error: 'The login information was incorrect'
              })
            }
      
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if (!isPasswordValid) {
              return res.status(403).send({
                error: 'The login information was incorrect'
              })
            }
      
            const userJson = user.toJSON()
            res.send({
              user: userJson,
              token: jwtSignUser(userJson)
            })
          } catch (err) {
            res.status(500).send({
              error: 'An error has occured trying to log in'
            })
          }
    }
}
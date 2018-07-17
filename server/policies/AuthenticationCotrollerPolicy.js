const Joi = require('joi')

const schema = {
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/)
  }

module.exports = {
        register (req, res, next) {
            
            const {error} = Joi.validate(req.body, schema)
        
            if (error) {
              switch (error.details[0].context.key) {
                case 'email':
                  res.status(400).send({
                    error: 'You must provide a valid email address'
                  })
                  break
                case 'password':
                  res.status(400).send({
                    error: `The password provided failed to match the following rules:
                      <br>
                      1. It must contain ONLY the following characters: lower case, upper case, numerics.
                      <br>
                      2. It must be at least 8 characters in length and not greater than 32 characters in length.
                    `
                  })
                  break
                default:
                  res.status(400).send({
                    error: 'Invalid registration information'
                  })
              }
            } else {
              next()
            }
          },
          
          login (req,res,next) {
            const {error} = Joi.validate(req.body, schema)
            if(error){
                res.status(400).send({
                    error: 'Invalid login information'
                })
            } else {
              next()
            }
          }
    }

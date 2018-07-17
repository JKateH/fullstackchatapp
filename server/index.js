const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const config = require('./config/config')
const mongoose = require('mongoose')
const volleyball = require('volleyball')
const router = require('./router/api')

mongoose.connect('mongodb://localhost:27017/chatapp',{ useNewUrlParser: true })
mongoose.Promise = global.Promise


const app = express()
app.use(volleyball)
app.use(bodyparser.json())
app.use(cors())

app.use(router)

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
  }
  
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
  }

app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Listening in port: ${config.port}`)
})
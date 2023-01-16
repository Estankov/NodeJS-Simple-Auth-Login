const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const authRoute = require('./routes/authRoutes')


const app = express()
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL2)
    .then(()=> console.log('DB ok'))
    .catch((err) => console.log(err))


// middwares
app.use(morgan('dev'))
app.use(express.json())

app.use('/users', authRoute)
    
app.listen(process.env.PORT)
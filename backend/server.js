// import dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

// routes
app.use('/api', userRoutes)


// connect to db and listen
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB | Listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })




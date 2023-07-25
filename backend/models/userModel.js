const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(email, password) {
    // validate credentials
    if (!email || !password) {
        throw Error('Fill in all fields')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email must be in correct format')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // check if user already in db
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('User already exists')
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})
    if (!user) {
        throw Error('User not found')
    }

    return user

} 

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('Fill in all fields')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('User not found')
    }
    
    // decrypt password and compare to db credentials
    const match = await bcrypt.compare(password, user.password)
    if (!match) {

        throw Error('Wrong password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)
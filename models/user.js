const mongoose  = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    addrees: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
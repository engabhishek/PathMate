const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: String,
    Email: String,
    password: String,
})
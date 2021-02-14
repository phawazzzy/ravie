const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
    email: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    password: { type: String, required: true},
    dateRegistered: { type: Date, default: Date.now}
});

module.exports = mongoose.model("user", userSchema);
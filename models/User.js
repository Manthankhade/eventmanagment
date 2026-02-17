// models/User.js

const mongoose = require("mongoose");

// Define schema for User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,      // Must provide a username
    },
    email: {
        type: String,
        required: true,      // Must provide an email
        unique: true         // No duplicate emails
    },
    password: {
        type: String,
        required: true       // Must provide a password
    }
}, { timestamps: true });   // Optional: automatically adds createdAt & updatedAt

// Export the model correctly
module.exports = mongoose.model("User", userSchema);

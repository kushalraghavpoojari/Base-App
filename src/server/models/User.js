var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: String,
    address: String,
    phone: String,
    bio: String,
    googleId: String,
    facebookId: String,
    picture: String,
    admin: Boolean,
    created_at: Date,
    modified_at: Date,
    website: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

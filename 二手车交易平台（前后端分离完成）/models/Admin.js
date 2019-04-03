var mongoose = require('mongoose');
module.exports = mongoose.model("Admin",{
    "email":String,
    "avatar":String
})
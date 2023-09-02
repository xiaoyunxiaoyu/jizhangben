const mongoose = require('mongoose');
const AuthSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
const AuthModel = mongoose.model('auth', AuthSchema); // auth为表名
module.exports = AuthModel;

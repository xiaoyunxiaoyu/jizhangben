const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    time: Date,
    type: {
        type: String,
        default: 'get',
    },
    money: {
        type: Number,
        required: true,
    },
    remarks: String
})
const AccountModel = mongoose.model('account', AccountSchema);
module.exports = AccountModel;

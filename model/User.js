const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true

    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);
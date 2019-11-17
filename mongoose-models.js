const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactMessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    processed: {
        type: Boolean,
        required: true,
        default: false
    }
});

exports.contactMessageModel = mongoose.model('ContactMessage', contactMessageSchema);

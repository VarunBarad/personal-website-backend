require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseModels = require('./mongoose-models');

const app = express();

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(cors({
    origin: 'https://varunbarad.com'
}));
app.use(bodyParser.json());

app.post('/contact', function (request, response) {
    response.json({
        'message': 'received',
        'details': request.body
    });

    const contactDetails = mongooseModels.contactMessageModel({
        name: request.body.name,
        email: request.body.email,
        message: request.body.message
    });
    contactDetails.save(function (error, data) {
        if (error) {
            console.error(`Database contact insertion error: ${error}`);
        } else {
            console.log(`Database contact insertion success: ${contactDetails.name}`);
        }
    });
});

app.get('/messages/unread', function (request, response) {
    const messageModel = mongooseModels.contactMessageModel;

    messageModel.find({processed: false}, function (error, unreadMessages) {
        response.json(unreadMessages.map(message => ({
            "id": message._id,
            "name": message.name,
            "email": message.email,
            "message": message.message,
            "timestamp": message.incomingDate
        })));
    });
});

app.get('/messages/read', function (request, response) {
    const messageModel = mongooseModels.contactMessageModel;

    messageModel.find({processed: true}, function (error, unreadMessages) {
        response.json(unreadMessages.map(message => ({
            "id": message._id,
            "name": message.name,
            "email": message.email,
            "message": message.message,
            "timestamp": message.incomingDate
        })));
    });
});

app.listen(process.env.PORT);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    userId: {
        type: String
    },
    building: {
        type: Number,
    },
    floor: {
        type: Number,
    },
    id: {
        type: Number,
    },
    m2: {
        type: Number,
    },
    conf: {
        type: Number,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean,
    },
    name: {
        type: String
    },
    contact: {
        type: Number
    },
    email: {
        type: String
    },
    startRent: {
        type: Number
    },
    endRent: {
        type: Number
    },
    expDate: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Apartment = mongoose.model('apartment', ApartmentSchema);
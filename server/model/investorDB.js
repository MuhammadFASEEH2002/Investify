const mongo = require('mongoose');

const InvestorSchema = new mongo.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    cnic: {
        type: String,
        unique: true,
        required: true
    },

    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean
    },
    OTP: {
    }

},
    {
        timestamps: true
    }
)

const Investor = mongo.model('Investor', InvestorSchema);

module.exports = Investor;

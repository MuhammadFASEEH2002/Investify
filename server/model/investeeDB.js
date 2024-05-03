const mongo = require('mongoose');

const InvesteeSchema = new mongo.Schema({

    businessName: {
        type: String,
        unique: true,
        required: true
    },

    category: {
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

    address: {
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

    zipcode: {
        type: String,
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
    isVerified: {
        type: Boolean,
        required: true
    },
    cnicDoc: {
        type: String,
        required: true
    },
    OTP: {
    },
    isOnline: {
        type: Boolean
    },
    // listings:[{
    //     type: mongo.Types.ObjectId,
    //     ref: "Listing",
    // }]

}, {
    timestamps: true
})

const Investee = mongo.model('Investee', InvesteeSchema);

module.exports = Investee;

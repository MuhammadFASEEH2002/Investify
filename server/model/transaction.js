const mongo = require('mongoose');

const TransactionSchema = new mongo.Schema({
    amount: {
        type: String,
    },
    to: {
        type: String
    },
    from: { type: String },
    status: {
        type: String,

    },
    listingId: {
        type: String,
        ref: 'Listing'
    },
    amountType:{
        type:String
    }

},
    {
        timestamps: true
    }
)

const Transaction = mongo.model('Transaction', TransactionSchema);

module.exports = Transaction;
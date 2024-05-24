const mongo = require('mongoose');

const ProfitSchema = new mongo.Schema({
    amount: {
        type: String,
    },
profitProof:{
    type:String
},
    listingId: {
        type: String,
        ref: 'Listing'
    }
},
    {
        timestamps: true
    }
)

const Profit = mongo.model('Profit', ProfitSchema);

module.exports = Profit;
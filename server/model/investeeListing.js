const mongo = require("mongoose");

const listingSchema = new mongo.Schema({
  description: {
    type: String,
    required: true,
  },
  profitPercentage: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  investmentDuration: {
    type:String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  investee_id: {
    type: String,
    required: true,
    ref : 'Investee'
  },
  // investor_id:{
  //   type:String,
  //   ref: "Investor"
  // }
},
{
  timestamps: true
}
);

const Listing = mongo.model("Listing", listingSchema);

module.exports = Listing;

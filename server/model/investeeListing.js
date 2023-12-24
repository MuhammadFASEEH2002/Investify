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
  // investmentDurationCompleted:{
  //   type: Boolean,
  //   required: false,
  // },
  isVerified: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  // gotInvestment:{
  //   typpe:Boolean,
  //   required: true,
  // },
  investee_id: {
    type: String,
    required: true,
    ref : 'Investee'
  },
  // investor_id:{
  //   type:String,
  //   ref: "Investor"
  // }
  
});

const Listing = mongo.model("Listing", listingSchema);

module.exports = Listing;

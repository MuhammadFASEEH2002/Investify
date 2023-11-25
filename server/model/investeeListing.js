const mongo = require("mongoose");

const listingSchema = new mongo.Schema({
  investee_id: {
    type: String,
    required: true,
  },
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
});

const Listing = mongo.model("Listing", listingSchema);

module.exports = Listing;

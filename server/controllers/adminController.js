const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin= require("../model/admin");
const bcrypt = require("bcrypt");

exports.getInvestees= async (req, res) => {
  try {
    const investee = await Investee.find({isVerified: false});
    if(Investee){
      res.json({
        status: true,
        investee
      })
    }
    
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}
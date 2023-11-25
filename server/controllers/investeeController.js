const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing= require("../model/investeeListing");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
    const investee = await Investee.findOne({ _id: req.user });
    console.log(investee._id)

};
exports.updateMe = async (req, res) => {
    const investee = await Investee.findOne({ _id: req.user });
    console.log(investee._id)

};

exports.createListing=async (req, res)=>{
    try {
        const investee = await Investee.findOne({ _id: req.user });
        const listing = await Listing.create({
           investee_id: investee._id,
           description:req.body,
           profitPercentage: req.body,
           amount:req.body,
          });
          res.json({ message: "Listing created", status: true });
    
    } catch (error) {
    res.json({ message: error.message, status: false });
        
    }
   }

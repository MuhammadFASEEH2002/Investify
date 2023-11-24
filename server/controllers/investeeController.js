const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
    const investee = await Investee.findOne({ _id: req.user });
    // res.json(
    //     investee.email,
    //     investee.address
    // )
    console.log(investee._id)

};

exports.createListing=async (req, res)=>{
    const investee = Investee.findOne({ _id: req.user });
}

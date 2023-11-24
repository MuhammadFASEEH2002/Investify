const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
    const investee = Investee.find({ _id: req.user });
    console.log(investee)

};

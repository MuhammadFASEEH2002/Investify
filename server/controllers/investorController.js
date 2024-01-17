const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/investeeListing");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
    try {
      const investor = await Investor.findOne({ _id: req.user });
      if (Investor) {
        res.json({
          status: true,
          investor,
        });
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
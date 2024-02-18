const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/investeeListing");
const Notification = require("../model/notification");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
    try {
        const investor = await Investor.findOne({ _id: req.user });
        if (investor) {
            res.json({
                status: true,
                investor,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getListing = async (req, res) => {
    try {
        const listing = await Listing.find({ isVerified: true, isActive: true }).populate(
            "investee_id"
        );
        if (listing) {
            res.json({
                status: true,
                listing,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};
//   exports.searchListing = async (req, res) => {
//     try {
//       const listing = await Listing.find({ isVerified: true }).populate(
//         "investee_id"
//       );
//       if (listing) {
//         res.json({
//           status: true,
//           listing,
//         });
//       }
//     } catch (error) {
//       res.json({ message: error.message, status: false });
//     }
//   };

exports.searchListing = async (req, res) => {
    try {
        const listing = await Listing.find({
            $and: [
                {
                    $or: [
                        { description: { $regex: req.body.search, $options: "i" } },
                    ]
                },
                { isVerified: true, isActive:true }
            ]
        }).populate("investee_id");
        console.log(listing);
        // const listing=req.body.search
        // console.log(listing)
        res.json({ status: true, listing });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};
exports.getProduct = async (req, res) => {
    try {
        const listing = await Listing.findOne({_id: req.headers.id}).populate("investee_id");
        console.log(listing);
        res.json({ status: true, listing });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};
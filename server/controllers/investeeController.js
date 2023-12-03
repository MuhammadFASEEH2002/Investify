const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/investeeListing");
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

exports.createListing = async (req, res) => {
    try {
        const investee = await Investee.findOne({ _id: req.user });
        // console.log(investee._id)
        // console.log(req.body)
        const listing = await Listing.create({
            investee_id: investee._id,
            description: req.body.description,
            profitPercentage: req.body.profitPercentage,
            amount: req.body.amount,
            isVerified: false,
        });
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "investify180@gmail.com",
              pass: "vqkr elcq xdba mnbj",
            },
          });
          const mailOptions = await {
            from: "investify180@gmail.com",
            to: req.body.email,
            subject: "Investify | Investee",
            html: "<h1>The listing you created is awaiting approval</h1> <p>Approval may take upto 2 to 3 days by the Admin.</p> <p>Regards,</p><p>Investify</p>",
          };
          await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error" + error);
            } else {
              console.log("Email sent:" + info.response);
              // res.json({ status: 201, info });
            }
          });
        res.json({ message: "Listing created", status: true });

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
}

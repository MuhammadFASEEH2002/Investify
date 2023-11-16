const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');


exports.getInvestees = async (req, res) => {
  try {
    const investee = await Investee.find({ isVerified: false });
    if (Investee) {
      res.json({
        status: true,
        investee
      })
    }

  } catch (error) {
    res.json({ message: error.message, status: false });
  }
}
exports.approveInvestees = async (req, res) => {
  try {

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj"
      }
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.investeeEmail,
      subject: "Sending Email With React And Nodejs",
      html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log("Error" + error)
      } else {
          console.log("Email sent:" + info.response);
          res.status(201).json({status:201,info})
      }
  })
    await Investee.findByIdAndUpdate({ _id: req.body.investeeId }, { isVerified: true })
    res.json({ message: "Investee Approved", status: true });
    
  } catch (error) {
    res.json({ message: error.message, status: false });

  }
}
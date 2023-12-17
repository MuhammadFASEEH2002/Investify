const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/investeeListing");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");

exports.getMe = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user });
    if (Investee) {
      res.json({
        status: true,
        investee,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
// exports.getListing = async (req, res) => {
//   try {
//     const listing = await Listing.find({ isVerified: false }).populate(
//       "investee_id"
//     );
//     if (listing) {
//       res.json({
//         status: true,
//         listing,
//       });
//     }
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };
// exports.updateMe = async (req, res) => {
//   const investee = await Investee.findOne({ _id: req.user });
//   console.log(investee._id)

// };
exports.changePassword = async (req, res) => {
  try {
    // const hashOldPassword = await bcrypt.hash(req.body.oldPassword, 10);
    const hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    const investee = await Investee.findOne({ _id: req.user });
    if (await bcrypt.compare(req.body.oldPassword, investee.password)) {
      const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
        if(!passwordRegex.test(req.body.newPassword)) {
        res.json({
          message:
            "Password should have minimum 8 characters. No spaces allowed and at least 1 alphabet or letter is compulsory",
          status: false,
        });
        return;
      }
      await Investee.findByIdAndUpdate(
        { _id: investee._id },
        { password: hashNewPassword }
      );
      res.json({ message: "Password Changed", status: true });
    } else {
      res.json({
        message: "Old Password is not correct",
        status: false,
      });
      return;
    }
  } catch (error) {
    res.json({ message: error.message, status: false });

  }
};

exports.createListing = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user });
    const descriptionWordCount = req.body.description
      .trim()
      .split(/\s+/).length;
    if (descriptionWordCount < 50) {
      res.json({
        message: "Description should have atleast 50 words.",
        status: false,
      });
      return;
    }

    const equity = /^(?:[5-9]|1\d|2[0-9]|30)$/;
    if (!equity.test(req.body.profitPercentage)) {
      res.json({
        message: "Equity should be between 5 - 30",
        status: false,
      });
      return;
    }

    const investmentAmount = /^(1[0-9]|2[0-4])\d{3}$|^25000$/;
    if (!investmentAmount.test(req.body.amount)) {
      res.json({
        message: "Investment amount should be betweeen 10,000- 25,000",
        status: false,
      });
      return;
    }
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
};

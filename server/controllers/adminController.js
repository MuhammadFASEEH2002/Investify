const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const Listing = require("../model/investeeListing");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.getStatistics = async (req, res) => {
  try {
   
    const allListingCount = await Listing.count()
    const activeListingCount = await Listing.count({ isActive: true })
    const verifiedListingCount = await Listing.count({ isVerified: true })
    const allInvesteeCount = await Investee.count()
    const approvedInvesteeCount = await Investee.count({ isVerified: true })
    const allInvestorCount = await Investor.count()
  

    if (allListingCount && activeListingCount && verifiedListingCount && allInvesteeCount && approvedInvesteeCount && allInvestorCount) {
      res.json({
        status: true,
        allListingCount, activeListingCount, verifiedListingCount, allInvesteeCount, approvedInvesteeCount, allInvestorCount
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.user });
    if (admin) {
      res.json({
        status: true,
        admin,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.getInvestees = async (req, res) => {
  try {
    const investee = await Investee.find({ isVerified: false });
    if (investee) {
      res.json({
        status: true,
        investee,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.find({ isVerified: false }).populate(
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
exports.approveInvestees = async (req, res) => {
  try {
    await Investee.findByIdAndUpdate(
      { _id: req.body.investeeId },
      { isVerified: true }
    );
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.investeeEmail,
      subject: "Investify",
      html: "<h1>Congratulations your Investee account is approved</h1> <p> You can now now login to your account by using your email and password. </p> <p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    res.json({ message: "Investee Approved", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.approveListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(
      { _id: req.body.listingId },
      { isVerified: true }
    );

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.listingInvesteeEmail,
      subject: "Investify",
      html: "<h1>Congratulations your Investee account is approved</h1> <p> You can now now login to your account by using your email and password. </p> <p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    res.json({ message: "Listing Approved", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.declineInvestees = async (req, res) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.investeeEmail,
      subject: "Investify",
      html: "<h1>Your Investee account verification is declined.</h1> <p> Possible reasons for your request disapproval can be </p> <ul><li></li></ul> <p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    await Investee.findByIdAndDelete(req.body.investeeId);
    res.json({ message: "Investee Declined", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


exports.declineListing = async (req, res) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.listingInvesteeEmail,
      subject: "Investify",
      html: "<h1>Your Listing is declined</h1> <p> Possible reasons for your Listing disapproval can be </p> <ul><li>False information</li><li>Description is not written properly</li></ul><p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    await Listing.findByIdAndDelete(req.body.listingId);
    res.json({ message: "Listing Declined", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};




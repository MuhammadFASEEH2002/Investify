const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const Listing = require("../model/listing");
const Notification = require("../model/notification");
const Transaction = require("../model/transaction");
const Profit = require("../model/profit");
const env = require('dotenv').config()
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.getStatistics = async (req, res) => {
  try {
    const allListingCount = await Listing.countDocuments()
    const activeListingCount = await Listing.countDocuments({ isActive: true })
    const verifiedListingCount = await Listing.countDocuments({ isVerified: true })
    const allInvesteeCount = await Investee.countDocuments()
    const approvedInvesteeCount = await Investee.countDocuments({ isVerified: true })
    const allInvestorCount = await Investor.countDocuments()
    res.json({
      status: true,
      allListingCount, activeListingCount, verifiedListingCount, allInvesteeCount, approvedInvesteeCount, allInvestorCount
    });
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
    const investee = await Investee.findOne({ _id: req.body.investeeId });

    await Investee.findByIdAndUpdate(
      { _id: req.body.investeeId },
      { isVerified: true }
    );
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.investeeEmail,
      subject: "Investify",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Update Listing</title>
      <style>
          body {
          font-family: Arial, sans-serif;
          }

          .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          }

          h2 {
          text-align: center;
          }

          .btn {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <h2>Investee Account Verification Successful</h2>
          <p>Dear ${investee.businessName},</p>
          <p>Your account is now approved you can login by using your email and password./p>
         
          <p>Thank you for choosing our platform. If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br/>Investify Team</p>
      </div>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    await Notification.create({
      investeeId: investee._id,
      message: `Dear ${investee.businessName}, congratulations your account is approved now you can explore investment opportunities.`,
      isRead: false
    })
    res.json({ message: "Investee Approved", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.approveListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      { _id: req.body.listingId },
      { isVerified: true }
    );

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.listingInvesteeEmail,
      subject: "Investify",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Update Listing</title>
      <style>
          body {
          font-family: Arial, sans-serif;
          }

          .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          }

          h2 {
          text-align: center;
          }

          .btn {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <h2>Business Listing Verification Successful</h2>
          <p>Dear Investee,</p>
          <p>Your listing is approved and will be visible to all the investors present on our platform./p>
         
          <p>Thank you for choosing our platform. If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br/>Investify Team</p>
      </div>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    await Notification.create({
      investeeId: listing.investee_id,
      message: `Dear Investee, your listing was approved by our admin.`,
      isRead: false
    })
    res.json({ message: "Listing Approved", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.declineInvestees = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.body.investeeId });

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.investeeEmail,
      subject: "Investify",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Update Listing</title>
      <style>
          body {
          font-family: Arial, sans-serif;
          }

          .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          }

          h2 {
          text-align: center;
          }

          .btn {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <h2>Investee Account Verification Unsuccessful</h2>
          <p>Dear ${investee.businessName},</p>
          <p>Your account verification is declined because the data you provided was incorrect or inappropriate.</p>
          <p>Thank you for choosing our platform. If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br/>Investify Team</p>
      </div>
      </body>
      </html>`,
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
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: req.body.listingInvesteeEmail,
      subject: "Investify",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Update Listing</title>
      <style>
          body {
          font-family: Arial, sans-serif;
          }

          .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          }

          h2 {
          text-align: center;
          }

          .btn {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <h2>Investee Listing Verification Unsuccessful</h2>
          <p>Dear Investee,</p>
          <p>Your listing verification is declined because the data you provided was incorrect or inappropriate.</p>
          <p>Thank you for choosing our platform. If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br/>Investify Team</p>
      </div>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
    const listing = await Listing.findByIdAndDelete(req.body.listingId);
    await Notification.create({
      investeeId: listing.investee_id,
      message: `Dear Investee, unfortunately your listing cannot be approved because of incorrect or false information.`,
      isRead: false
    })
    res.json({ message: "Listing Declined", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.getAllInvestees = async (req, res) => {
  try {
    const investees = await Investee.find();
    if (investees) {
      res.json({
        status: true,
        investees,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getAllInvestors = async (req, res) => {
  try {
    const investors = await Investor.find();
    if (investors) {
      res.json({
        status: true,
        investors,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("listingId");
    if (transactions) {
      console.log(transactions)
      res.json({
        status: true,
        transactions,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getChatUser = async (req, res) => {
  try {
    const investor = await Investor.findById(req.body.id2)
    const investee = await Investee.findById(req.body.id2)
    if (investor) {
      res.json({
        status: true,
        investor,
      })
    } else {
      res.json({
        status: true,
        investee,
      })
    }

  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getInvestment = async (req, res) => {
  try {
    const investments = await Listing.find({ investor_id: { $exists: true } }).populate("investor_id investee_id");
    if (investments) {
      res.json({
        status: true,
        investments,
      })
    }

  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getInvestmentDetail = async (req, res) => {
  try {
    const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id investor_id profit");
    console.log(listing);
    // const investeeId = req.user
    res.json({ status: true, listing });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.payProfits = async (req, res) => {
  try {
    console.log(req.body.investment)
    const profitData = await Profit.create({ profitAmount: req.body.profitToGive, profitProof: req.body.url, listingId: req.body.investment?._id })
    // await trasaction.create({amount:req.body.profitToGive, transactionType: "Profit", listingId: req.body.investment._id})
    if (Profit) {
      await Listing.findByIdAndUpdate(req.body.investment?._id, { profit: profitData._id });
    }
    res.json({ status: true });

  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};







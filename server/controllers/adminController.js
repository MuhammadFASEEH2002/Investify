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
    const investee = await Investee.findOne({ _id: req.body.investeeId });

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
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
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
        user: "investify180@gmail.com",
        pass: "vqkr elcq xdba mnbj",
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
    await Listing.findByIdAndDelete(req.body.listingId);
    res.json({ message: "Listing Declined", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};




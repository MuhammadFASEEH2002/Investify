const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/listing");
const Notification = require("../model/notification");
const env = require('dotenv').config()
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
exports.updateMe = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user });
    const listingCount = await Listing.count({ investee_id: req.user, isActive: true })

    if (listingCount == 0) {
      const zipcodeRegex = /^\d{5}$/;
      if (!zipcodeRegex.test(req.body.zipcode)) {
        res.json({
          message: "Invalid Zip code",
          status: false,
        });
        return;
      }
      await Investee.findByIdAndUpdate(
        { _id: investee._id },
        {
          address: req.body.address,
          zipcode: req.body.zipcode,
          isVerified: false
        }
      );
      res.json({ message: "Listing Updated", status: true });

    } else {
      res.json({ message: "you cannot edit your profile with active listings", status: false });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // const hashOldPassword = await bcrypt.hash(req.body.oldPassword, 10);
    const hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    const investee = await Investee.findOne({ _id: req.user });
    if (await bcrypt.compare(req.body.oldPassword, investee.password)) {
      const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
      if (!passwordRegex.test(req.body.newPassword)) {
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
    const listingCount = await Listing.countDocuments({ investee_id: req.user, isActive: true, isInvestmentEnded: false }) //in future add a tag to verify that the investment is ended in a listing inorder to only get the count of active listing listings
    console.log(listingCount)
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

    const equity = /^(?:[5-9]|1[0-5])$/;
    if (!equity.test(req.body.profitPercentage)) {
      res.json({
        message: "Equity should be between 5 - 15",
        status: false,
      });
      return;
    }

    const investmentAmount = /^(1[0-9]|2[0-4])\d{3}$|^25000$/;
    if (!investmentAmount.test(req.body.amount)) {
      res.json({
        message: "Investment amount should be between 10,000- 25,000",
        status: false,
      });
      return;
    }
    const Duration = /^[1-3]$/;
    if (!Duration.test(req.body.investmentDuration)) {
      res.json({
        message: "Investment duration can only be of 1 to 3 years",
        status: false,
      });
      return;
    }
    if (listingCount >= 3) {
      res.json({
        message: "Limit of 3 active listings exceeded",
        status: false,
      });
      return;
    } else {

      const listing = await Listing.create({
        investee_id: investee._id,
        description: req.body.description,
        profitPercentage: req.body.profitPercentage,
        investmentDuration: req.body.investmentDuration,
        amount: req.body.amount,
        isVerified: false,
        isActive: true,
        isInvestmentEnded: false
      });
    }

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: investee.email,
      subject: "Investify | Investee",
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
          <h2>New Listing Awaiting Admin Verification.</h2>
          <p>Dear ${investee.businessName},</p>
          <p>Your new listing verification may take upto 2 or 3 days from the admin.</p>
          <p>
          </p>
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
        // res.json({ status: 201, info });
      }
    });
    await Notification.create({
      investeeId: investee._id,
      message: `Dear ${investee.businessName}, your listing is successfully created and awaiting admin approval.`,
      isRead: false
    })
    res.json({ message: "Listing created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.editListing = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user });
    // const listingCount= await Listing.count({ investee_id: req.user, isActive: true })
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

    const equity = /^(?:[5-9]|1[0-5])$/;
    if (!equity.test(req.body.profitPercentage)) {
      res.json({
        message: "Equity should be between 5 - 15",
        status: false,
      });
      return;
    }

    const investmentAmount = /^(1[0-9]|2[0-4])\d{3}$|^25000$/;
    if (!investmentAmount.test(req.body.amount)) {
      res.json({
        message: "Investment amount should be between 10,000- 25,000",
        status: false,
      });
      return;
    }
    const Duration = /^[1-3]$/;
    if (!Duration.test(req.body.investmentDuration)) {
      res.json({
        message: "Investment duration can only be of 1 to 3 years",
        status: false,
      });
      return;
    }
    // if (listingCount >= 3) {
    //   res.json({
    //     message: "Limit of 3 active listings exceeded",
    //     status: false,
    //   });
    //   return;
    // } else  {

    const listing = await Listing.findByIdAndUpdate({ _id: req.body.listingId }, {

      description: req.body.description,
      profitPercentage: req.body.profitPercentage,
      investmentDuration: req.body.investmentDuration,
      amount: req.body.amount,
      isVerified: false,
      isActive: true
    });
    // }

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.password}`,
      },
    });
    const mailOptions = await {
      from: "investify180@gmail.com",
      to: investee.email,
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
          <h2>Updated Listing Awaiting Admin Verification.</h2>
          <p>Dear ${investee.businessName},</p>
          <p>Your listing verification may take upto 2 or 3 days from the admin.</p>
          <p>
          </p>
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
        // res.json({ status: 201, info });
      }
    });
    await Notification.create({
      investeeId: investee._id,
      message: `Dear ${investee.businessName}, your listing is successfully updated and awaiting admin approval to be republished again.`,
      isRead: false
    })
    res.json({ message: "Listing created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    // const investee = await Investee.findOne({ _id: req.user });
    const listing = await Listing.find({ investee_id: req.user, isActive: true, isInvestmentEnded: false }).populate("investee_id investor_id")
    // const listing = await Listing.find({ isVerified: false }).populate(
    //   "investee_id"
    // );
    console.log(listing)
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
exports.getMyListingHistory = async (req, res) => {
  try {
    const listing = await Listing.find({
      investee_id: req.user,
      $and: [
        {
          $or: [
            { isActive: false },
            { isInvestmentEnded: true }
          ]
        },
        {
          $or: [
            { isVerified: true },
            { isVerified: false }
          ]
        }
      ]
    }).populate("investee_id")
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
exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate({ _id: req.body.listingId },
      { isActive: false });
    res.json({ message: "Listing Deleted", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ investeeId: req.user }).sort({ createdAt: -1 })
    res.json({
      status: true,
      notifications
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.setMarkAsRead = async (req, res) => {
  try {
    const notifications = await Notification.findByIdAndUpdate({ _id: req.body.notificationId }, { isRead: true })
    res.json({
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getStats = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user });
    const TotalListingCount = await Listing.countDocuments({ investee_id: req.user })
    const ActiveListingCount = await Listing.countDocuments({ investee_id: req.user, isActive: true, isInvestmentEnded: false })
    const DeletedListingCount = await Listing.countDocuments({
      investee_id: req.user,
      $and: [
        {
          $or: [
            { isActive: false },
            { isInvestmentEnded: true }
          ]
        },
        {
          $or: [
            { isVerified: true },
            { isVerified: false }
          ]
        }
      ]
    })
    const TotalUnreadNotifications = await Notification.countDocuments({ investeeId: req.user, isRead: false })
    const FundingAmount = await Listing.find({ isVerified: true, investee_id: investee._id, payment_session_id: { $exists: true }, investor_id: { $exists: true } }).populate( //correct it
      "investee_id investor_id"
    );
    const TotalFundingAmount = FundingAmount.reduce((acc, amount) => {
      return acc + (Number(amount?.amountReceived) || 0);
    }, 0);
    console.log(TotalFundingAmount)


    res.json({ status: true, TotalListingCount, ActiveListingCount, DeletedListingCount, TotalUnreadNotifications, TotalFundingAmount });

  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.getInvestments = async (req, res) => {
  try {
    const investee = await Investee.findOne({ _id: req.user })
    console.log(investee._id)
    const listing = await Listing.find({ isVerified: true, investee_id: investee._id, payment_session_id: { $exists: true }, investor_id: { $exists: true } }).populate( //correct it
      "investee_id investor_id profit"
    );
    console.log(listing)
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

exports.getChatUser = async (req, res) => {
  try {
    const chatUser = await Investor.findOne({ _id: req.body.id1 })
    if (chatUser) {
      res.json({
        status: true,
        chatUser
      });
    }

  } catch (error) {

  }
}
exports.getInvestmentDetail = async (req, res) => {
  try {
    const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id investor_id profit");
    console.log(listing);
    const investeeId = req.user
    res.json({ status: true, listing, investeeId });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    await Investee.findByIdAndUpdate({ _id: req.user }, {
      isOnline: false,
    })
    res.json({ message: "user logged out", status: true, });


  } catch (error) {
    res.json({ message: error.message, status: false });

  }
}
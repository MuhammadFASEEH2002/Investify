const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

exports.investorRegistration = async (req, res) => {
  try {
    const EmailExist = await Investor.findOne({ email: req.body.email });
    const CnicExist = await Investor.findOne({ cnic: req.body.cnic });

    const PhoneExist = await Investor.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (EmailExist || CnicExist || PhoneExist) {
      res.json({
        message: "User with the same Email, Cnic or Phone Number already exist",
        status: false,
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      res.json({
        message: "Invalid Email Address",
        status: false,
      });
      return;
    }
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(req.body.cnic)) {
      res.json({
        message: "Invalid Cnic Address",
        status: false,
      });
      return;
    }
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(req.body.phoneNumber)) {
      res.json({
        message: "Invalid Phone Number",
        status: false,
      });
      return;
    }
    const nameRegex = /^[A-Za-z]+$/;
    if (
      !nameRegex.test(req.body.firstName) ||
      !nameRegex.test(req.body.lastName)
    ) {
      res.json({
        message: "Invalid First Name or Last Name",
        status: false,
      });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
    if (
      !passwordRegex.test(req.body.password) ||
      !passwordRegex.test(req.body.confirmPassword)
    ) {
      res.json({
        message:
          "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
        status: false,
      });
      return;
    }
    // const { valid, reason, validators } = await emailValidator.validate(
    //   req.body.email
    // );
    // if (!valid) {
    //   res.json({
    //     message: validators[reason].reason,
    //     reason: "Email is not valid or doesnot exist",
    //     status: false,
    //   });
    //   return;
    // }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //   const token = await jwt.sign({ id: investor._doc._id }, "mysecurepassword");
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
      subject: "Investify | Investor",
      html: "<h1>Congratulations your Investor account is created</h1> <p> You can now now login to your account by using your email and password. </p> <p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
        res.json({
          message: error,
          status: false,
        });
        return;
      } else {
        console.log("Email sent:" + info.response);
        // res.status(201).json({ status: 201, info });
      }
    });
    const investor = await Investor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cnic: req.body.cnic,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: hashPassword,
      country: req.body.selectedCountry,
      city: req.body.selectedCity,
    });
    res.json({ message: "user created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Investee Registration
exports.investeeRegistration = async (req, res) => {
  try {
    const BusinessNameExist = await Investee.findOne({
      businessName: req.body.businessName,
    });

    const EmailExist = await Investee.findOne({ email: req.body.email });
    const CnicExist = await Investee.findOne({ cnic: req.body.cnic });
    const PhoneExist = await Investee.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    if (BusinessNameExist || EmailExist || CnicExist || PhoneExist) {
      res.json({
        message:
          "User having the same Business Name, Email, CNIC or Phone Number already exist",
        status: false,
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      res.json({
        message: "Invalid Email Address",
        status: false,
      });
      return;
    }
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(req.body.cnic)) {
      res.json({
        message: "Invalid Cnic Address",
        status: false,
      });
      return;
    }
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(req.body.phoneNumber)) {
      res.json({
        message: "Invalid Phone Number",
        status: false,
      });
      return;
    }
    const zipcodeRegex = /^\d{5}$/;
    if (!zipcodeRegex.test(req.body.zipcode)) {
      res.json({
        message: "Invalid Zip code",
        status: false,
      });
      return;
    }
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(req.body.businessName)) {
      res.json({
        message: "Invalid Business name",
        status: false,
      });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
    if (
      !passwordRegex.test(req.body.password) ||
      !passwordRegex.test(req.body.confirmPassword)
    ) {
      res.json({
        message:
          "Password should have minimum 8 characters. No spaces allowed and at least 1 alphabet or letter is compulsory",
        status: false,
      });
      return;
    }
    // const { valid, reason, validators } = await emailValidator.validate(
    //   req.body.email,{
    //     validateRegex: true,
    //     validateMx: false,
    //     validateTypo: false,
    //     validateDisposable: false,
    //     validateSMTP: true,
    //   }
    // );
    // if (!valid) {
    //   res.json({
    //     message: validators[reason].reason,
    //     reason: "Email is not valid or doesnot exist",
    //     status: false,
    //   });
    //   return;
    // }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    
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
      html: "<h1>Your Investee account is awaiting approval</h1> <p>Approval may take upto 2 to 3 days.</p> <p>Regards,</p><p>Investify</p>",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
        res.json({
          message: error,
          status: false,
        });
        return;
      } else {
        console.log("Email sent:" + info.response);
        // res.json({ status: 201, info });
      }
    });
    const investee = await Investee.create({
      businessName: req.body.businessName,
      cnic: req.body.cnic,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashPassword,
      address: req.body.address,
      zipcode: req.body.zipcode,
      country: req.body.selectedCountry,
      city: req.body.selectedCity,
      category: req.body.selectedCategory,
      isVerified: false,
      cnicDoc: req.file.filename,
    });

    res.json({ message: "user created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

exports.investorLogin = async (req, res) => {
  try {
    const Exist = await Investor.findOne({ email: req.body.email });
    if (!Exist) {
      res.json({
        message: "User doesn`t Exist, Kindly Register",
        status: false,
      });
    } else {
      const verify = await bcrypt.compare(
        req.body.password,
        Exist._doc.password
      );
      if (verify) {
        // const token = await jwt.sign({ id: Exist._doc._id }, "mysecurepassword");
        const token = await jwt.sign({ id: Exist._doc._id }, "Aeiou.123", { expiresIn: '1h' });
        res.json({
          token,
          status: true,
        });
      } else {
        res.json({ message: "Invalid Password", status: false });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.investeeLogin = async (req, res) => {
  try {
    const Exist = await Investee.findOne({ email: req.body.email });
    if (!Exist) {
      res.json({
        message: "User doesn`t Exist, Kindly Register",
        status: false,
      });
    } else {
      const verifyPassword = await bcrypt.compare(
        req.body.password,
        Exist._doc.password
      );
      // const verifyAccount= await bcrypt.compare(req.body.password, Exist._doc.password);
      if (Exist._doc.isVerified === true) {
        if (verifyPassword) {
          const token = await jwt.sign({ id: Exist._doc._id }, "Aeiou.123", { expiresIn: '1h' });
          res.json({
            token,
            status: true,
          });
        } else {
          res.json({ message: "Invalid Password", status: false });
        }
      } else {
        res.json({
          message:
            "User not verified, you can login once your account is verified by the admin",
          status: false,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
exports.adminLogin = async (req, res) => {
  try {
    const Exist = await Admin.findOne({ username: req.body.username });
    if (!Exist) {
      res.json({ message: "Invalid Credentials", status: false });
    } else {
      // const verify = await bcrypt.compare(req.body.password, Exist._doc.password);

      if (Exist._doc.password == req.body.password) {
        const adminToken = await jwt.sign({ id: Exist._doc._id }, "admin", { expiresIn: '1h' });
        res.json({
          adminToken,
          status: true,
        });
      } else {
        res.json({ message: "Invalid Password", status: false });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

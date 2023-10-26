const router = require("express").Router();
const Investor = require("../model/investorDB");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/investor-registration", async (req, res) => {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (!nameRegex.test(req.body.firstName) || !nameRegex.test(req.body.lastName) ) {
      res.json({
        message: "Invalid First Name or Last Name",
        status: false,
      });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(req.body.password) || !passwordRegex.test(req.body.confirmPassword) ) {
      res.json({
        message: "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
        status: false,
      });
      return;
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const investor = await Investor.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      cnic: req.body.cnic,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: hashPassword,
      country: req.body.selectedCountry,
      city: req.body.selectedCity,
    });
    //   const token = await jwt.sign({ id: investor._doc._id }, "mysecurepassword");
    res.json({ message: "user created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
});

router.post("/investee-registration", async (req, res) => {
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
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const investor = await Investor.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      cnic: req.body.cnic,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: hashPassword,
      country: req.body.selectedCountry,
      city: req.body.selectedCity,
    });
    //   const token = await jwt.sign({ id: investor._doc._id }, "mysecurepassword");
    res.json({ message: "user created", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
});
module.exports = router;

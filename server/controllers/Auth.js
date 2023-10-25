const router = require("express").Router();
const Investor = require("../model/investorDB");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/investor-registration", async (req, res) => {
  const Exist = await Investor.findOne({ email: req.body.email });
  if (Exist) {
    res.status(301).json({ message: "Email Already Exist!" });
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
  res.json({ message: "user created"});
});
module.exports = router

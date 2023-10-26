const router = require("express").Router();
const Investor = require("../model/investorDB");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/investor-registration", async (req, res) => {
  try {
  const EmailExist = await Investor.findOne({ email: req.body.email });
  const CnicExist = await Investor.findOne({ cnic: req.body.cnic });

  const PhoneExist = await Investor.findOne({ phoneNumber: req.body.phoneNumber });

  if (EmailExist || CnicExist || PhoneExist ) {
    res.json({ message: "User with the same Email, Cnic or Phone Number already exist" , status : false });
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
    res.json({ message: "user created" , status : true});
  
} catch (error) {
    res.json({ message: error.message , status : false});
}  
});
module.exports = router
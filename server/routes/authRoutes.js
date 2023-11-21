const router = require('express').Router()
const AuthController  = require('../controllers/authController')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../upload/investee");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload= multer({
    storage :storage
  })

router.post('/investor-registration' , AuthController.investorRegistration)
router.post('/investee-registration' , upload.single('file') , AuthController.investeeRegistration)
router.post('/investor-login' , AuthController.investorLogin)
router.post('/investee-login' , AuthController.investeeLogin)
router.post('/admin-login' , AuthController.adminLogin)


module.exports = router;
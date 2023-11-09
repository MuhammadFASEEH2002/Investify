const router = require('express').Router()
const AuthController  = require('../controllers/authController')

router.post('/investor-registration' , AuthController.investorRegistration)
router.post('/investee-registration' , AuthController.investeeRegistration)
router.post('/investor-login' , AuthController.investorLogin)
router.post('/investee-login' , AuthController.investeeLogin)
router.post('/admin-login' , AuthController.adminLogin)


module.exports = router;
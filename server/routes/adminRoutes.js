const router = require('express').Router()
const AdminController  = require('../controllers/adminController')

router.post('/account-verification' , AdminController.accountVerification)

module.exports = router;
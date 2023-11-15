const router = require('express').Router()
const AdminController  = require('../controllers/adminController')

router.get('/get-investees' , AdminController.getInvestees)

module.exports = router;
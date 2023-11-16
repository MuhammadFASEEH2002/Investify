const router = require('express').Router()
const AdminController  = require('../controllers/adminController')

router.get('/get-investees' , AdminController.getInvestees)
router.post('/verify-investees' , AdminController.approveInvestees)

module.exports = router;
const router = require('express').Router()
const AdminController  = require('../controllers/adminController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-investees' ,verifyToken, AdminController.getInvestees)
router.post('/verify-investees' , AdminController.approveInvestees)
router.post('/decline-investees' , AdminController.declineInvestees)

module.exports = router;
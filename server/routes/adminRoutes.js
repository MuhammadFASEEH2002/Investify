const router = require('express').Router()
const AdminController  = require('../controllers/adminController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-investees' ,verifyToken, AdminController.getInvestees)
router.get('/get-listing' , AdminController.getListing)
router.post('/verify-investees' ,verifyToken, AdminController.approveInvestees)
router.post('/decline-investees' ,verifyToken, AdminController.declineInvestees)
router.post('/approve-listing' ,verifyToken, AdminController.approveListing)


module.exports = router;
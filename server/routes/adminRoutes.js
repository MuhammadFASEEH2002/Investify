const router = require('express').Router()
const AdminController  = require('../controllers/adminController')
const verifyAdminToken = require('../middleware/authMiddleware')


router.get('/get-admin' ,verifyAdminToken, AdminController.getMe)
router.get('/get-investees' ,verifyAdminToken, AdminController.getInvestees)
router.get('/get-listing' ,verifyAdminToken, AdminController.getListing)
router.post('/verify-investees' ,verifyAdminToken, AdminController.approveInvestees)
router.post('/decline-investees' ,verifyAdminToken, AdminController.declineInvestees)
router.post('/verify-listing' ,verifyAdminToken, AdminController.approveListing)
router.post('/decline-listing' ,verifyAdminToken, AdminController.declineListing)




module.exports = router;
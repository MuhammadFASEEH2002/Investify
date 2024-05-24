const router = require('express').Router()
const AdminController  = require('../controllers/adminController')
const verifyAdminToken = require('../middleware/authMiddleware')


router.get('/get-admin' ,verifyAdminToken, AdminController.getMe)
router.get('/get-stats' ,verifyAdminToken, AdminController.getStatistics)

router.get('/get-investees' ,verifyAdminToken, AdminController.getInvestees)
router.get('/get-listing' ,verifyAdminToken, AdminController.getListing)
router.post('/verify-investees' ,verifyAdminToken, AdminController.approveInvestees)
router.post('/decline-investees' ,verifyAdminToken, AdminController.declineInvestees)
router.post('/verify-listing' ,verifyAdminToken, AdminController.approveListing)
router.post('/decline-listing' ,verifyAdminToken, AdminController.declineListing)
router.get('/get-all-investees' ,verifyAdminToken, AdminController.getAllInvestees)
router.get('/get-all-investors' ,verifyAdminToken, AdminController.getAllInvestors)
router.get('/get-all-transactions' ,verifyAdminToken, AdminController.getAllTransactions)
router.post('/get-chat-user' ,verifyAdminToken, AdminController.getChatUser)
router.get('/get-investments' ,verifyAdminToken, AdminController.getInvestment)
router.get('/get-investment-detail' ,verifyAdminToken, AdminController.getInvestmentDetail)
router.post('/pay-profits' ,verifyAdminToken, AdminController.payProfits)










module.exports = router;
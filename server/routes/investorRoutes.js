const router = require('express').Router()
const InvestorController  = require('../controllers/investorController')
const verifyInvestorToken = require('../middleware/authMiddleware')

router.get('/get-user' ,verifyInvestorToken, InvestorController.getMe)
router.get('/get-listing' ,verifyInvestorToken, InvestorController.getListing)
router.get('/get-listing-view' ,verifyInvestorToken, InvestorController.getProduct)
// router.post('/search-listing' ,verifyInvestorToken, InvestorController.searchListing)
router.get("/get-notifications", verifyInvestorToken, InvestorController.getNotifications)
router.put("/set-mark-as-read", verifyInvestorToken, InvestorController.setMarkAsRead)
router.get('/get-stats' ,verifyInvestorToken, InvestorController.getStats)

module.exports = router;

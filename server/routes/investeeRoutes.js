const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyInvesteeToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyInvesteeToken, InvesteeController.getMe)
router.put('/edit-user' ,verifyInvesteeToken, InvesteeController.updateMe)

router.post('/create-listing' ,verifyInvesteeToken, InvesteeController.createListing)
router.get('/get-my-listings' ,verifyInvesteeToken, InvesteeController.getMyListings)
router.get('/get-my-listing-history' ,verifyInvesteeToken, InvesteeController.getMyListingHistory)
router.post('/delete-listing' ,verifyInvesteeToken, InvesteeController.deleteListing)
router.put('/edit-listing' ,verifyInvesteeToken, InvesteeController.editListing)
router.post('/change-password' ,verifyInvesteeToken, InvesteeController.changePassword)
router.get("/get-notifications", verifyInvesteeToken, InvesteeController.getNotifications)
router.put("/set-mark-as-read", verifyInvesteeToken, InvesteeController.setMarkAsRead)
router.get("/get-stats", verifyInvesteeToken, InvesteeController.getStats)
router.get('/get-investments' ,verifyInvesteeToken, InvesteeController.getInvestments)
router.get('/get-investment-detail' ,verifyInvesteeToken, InvesteeController.getInvestmentDetail)

router.post('/get-chat-user' ,verifyInvesteeToken, InvesteeController.getChatUser)
router.get('/logout' ,verifyInvesteeToken, InvesteeController.logout)









module.exports = router;
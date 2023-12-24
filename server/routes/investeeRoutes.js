const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyToken, InvesteeController.getMe)
router.post('/create-listing' ,verifyToken, InvesteeController.createListing)
router.get('/get-my-listings' ,verifyToken, InvesteeController.getMyListings)
router.get('/get-my-listing-history' ,verifyToken, InvesteeController.getMyListingHistory)
router.post('/delete-listing' ,verifyToken, InvesteeController.deleteListing)

router.post('/change-password' ,verifyToken, InvesteeController.changePassword)




module.exports = router;
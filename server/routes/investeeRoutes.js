const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyToken, InvesteeController.getMe)
router.put('/edit-user' ,verifyToken, InvesteeController.updateMe)

router.post('/create-listing' ,verifyToken, InvesteeController.createListing)
router.get('/get-my-listings' ,verifyToken, InvesteeController.getMyListings)
router.get('/get-my-listing-history' ,verifyToken, InvesteeController.getMyListingHistory)
router.post('/delete-listing' ,verifyToken, InvesteeController.deleteListing)
router.put('/edit-listing' ,verifyToken, InvesteeController.editListing)
router.post('/change-password' ,verifyToken, InvesteeController.changePassword)




module.exports = router;
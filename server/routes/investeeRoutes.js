const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyToken, InvesteeController.getMe)
router.post('/create-listing' ,verifyToken, InvesteeController.createListing)
router.get('/get-my-listings' ,verifyToken, InvesteeController.getMyListings)

router.post('/change-password' ,verifyToken, InvesteeController.changePassword)




module.exports = router;
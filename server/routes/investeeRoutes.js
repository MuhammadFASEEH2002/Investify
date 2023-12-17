const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyToken, InvesteeController.getMe)
router.post('/create-listing' ,verifyToken, InvesteeController.createListing)
router.post('/change-password' ,verifyToken, InvesteeController.changePassword)




module.exports = router;
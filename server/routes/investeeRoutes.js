const router = require('express').Router()
const InvesteeController  = require('../controllers/investeeController')
const verifyToken = require('../middleware/authMiddleware')


router.get('/get-user' ,verifyToken, InvesteeController.getMe)
router.get('/create-listing' ,verifyToken, InvesteeController.createListing)



module.exports = router;
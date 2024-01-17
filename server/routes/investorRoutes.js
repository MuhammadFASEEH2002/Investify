const router = require('express').Router()
const InvestorController  = require('../controllers/investorController')
const verifyInvestorToken = require('../middleware/authMiddleware')

router.get('/get-user' ,verifyInvestorToken, InvestorController.getMe)
router.get('/get-listing' ,verifyInvestorToken, InvestorController.getListing)
router.post('/search-listing' ,verifyInvestorToken, InvestorController.searchListing)


module.exports = router;

// const router = require('express').Router()
const ChatController = require('../controllers/chatController')
const verifyInvestorToken = require('../middleware/authMiddleware')
const verifyInvesteeToken = require('../middleware/authMiddleware')

const router = require('express').Router()



module.exports = (io) => {

router.post('/investor/send-message' ,verifyInvestorToken, (req,res)=> ChatController.sendInvestorMessage(req,res,io))
router.get('/investor/get-messages/:roomId' ,verifyInvestorToken, ChatController.getMessagesInvestor)
router.post('/investee/send-message' ,verifyInvestorToken, (req,res)=> ChatController.sendInvesteeMessage(req,res,io))
router.get('/investee/get-messages/:roomId' ,verifyInvestorToken, ChatController.getMessagesInvestee)
router.get('/investee/get-all-chats' ,verifyInvestorToken, ChatController.getAllChatsInvestee)


    
 
 
    return router
}
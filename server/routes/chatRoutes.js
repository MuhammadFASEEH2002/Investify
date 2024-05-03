// const router = require('express').Router()
const ChatController = require('../controllers/chatController')
const verifyInvestorToken = require('../middleware/authMiddleware')
const verifyInvesteeToken = require('../middleware/authMiddleware')

const router = require('express').Router()



module.exports = (io) => {

router.post('/investor/send-message' ,verifyInvestorToken, (req,res)=> ChatController.sendInvestorMessage(req,res,io))
router.get('/investor/get-messages/:roomId' ,verifyInvestorToken, ChatController.getMessagesInvestor)
router.get('/investor/get-all-chats' ,verifyInvestorToken, ChatController.getAllChatsInvestor)

router.post('/investee/send-message' ,verifyInvesteeToken, (req,res)=> ChatController.sendInvesteeMessage(req,res,io))
router.get('/investee/get-messages/:roomId' ,verifyInvesteeToken, ChatController.getMessagesInvestee)
router.get('/investee/get-all-chats' ,verifyInvesteeToken, ChatController.getAllChatsInvestee)


    
 
 
    return router
}
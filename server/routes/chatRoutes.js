// const router = require('express').Router()
const ChatController = require('../controllers/chatController')
const verifyInvestorToken = require('../middleware/authMiddleware')
const verifyInvesteeToken = require('../middleware/authMiddleware')
const verifyAdminToken = require('../middleware/authMiddleware')


const router = require('express').Router()



module.exports = (io) => {
    router.post('/investor/send-message', verifyInvestorToken, (req, res) => ChatController.sendInvestorMessage(req, res, io))
    router.post('/investor/chat-support/send-message', verifyInvestorToken, (req, res) => ChatController.sendInvestorSupportMessage(req, res, io))
    router.get('/investor/get-messages/:roomId', verifyInvestorToken, ChatController.getMessagesInvestor)
    router.get('/investor/chat-support/get-messages/:roomId', verifyInvestorToken, ChatController.getSupportMessagesInvestor)
    router.get('/investor/get-all-chats', verifyInvestorToken, ChatController.getAllChatsInvestor)

    router.post('/investee/send-message', verifyInvesteeToken, (req, res) => ChatController.sendInvesteeMessage(req, res, io))
    router.post('/investee/chat-support/send-message', verifyInvesteeToken, (req, res) => ChatController.sendInvesteeSupportMessage(req, res, io))
    router.get('/investee/get-messages/:roomId', verifyInvesteeToken, ChatController.getMessagesInvestee)
    router.get('/investee/chat-support/get-messages/:roomId', verifyInvesteeToken, ChatController.getSupportMessagesInvestee)
    router.get('/investee/get-all-chats', verifyInvesteeToken, ChatController.getAllChatsInvestee)

    router.get('/admin/get-all-chats', verifyAdminToken, ChatController.getAllChatsAdmin)
    router.post('/admin/chat-support/send-message', verifyAdminToken, (req, res) => ChatController.sendAdminSupportMessage(req, res, io))
    router.get('/admin/chat-support/get-messages/:roomId', verifyAdminToken, ChatController.getSupportMessagesAdmin)






    return router
}
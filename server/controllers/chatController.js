const Chat = require("../model/chat");

exports.sendInvestorMessage =async(req,res,io)=>{
    try {
        let message = await Chat.create({
           message: req.body.newMessage,
           chat_id: req.body.roomId,
           investor_id: req.user
          });
          message = await Chat.findById(message._id).populate('investor_id');
          if(io){
              io.emit(`${req.body.roomId}-new-message`, JSON.stringify(message));
          }
          res.json({
            status: true,
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.sendInvestorSupportMessage =async(req,res,io)=>{
    try {
        let message = await Chat.create({
           message: req.body.newMessage,
           chat_id: req.body.roomId,
           investor_id: req.user,
           chatType: 'support'

          });
          message = await Chat.findById(message._id).populate('investor_id');
          if(io){
              io.emit(`${req.body.roomId}-new-message`, JSON.stringify(message));
          }
          res.json({
            status: true,
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getMessagesInvestor =async(req,res,io)=>{
    try {
          message = await Chat.find( {chat_id : req.params.roomId}).populate('investor_id').sort({ createdAt: 1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}

exports.getSupportMessagesInvestor =async(req,res,io)=>{
    try {
          message = await Chat.find( {chat_id : req.params.roomId}).populate('investor_id').sort({ createdAt: 1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getAllChatsInvestor =async(req,res)=>{
    try {
          message = await Chat.find({investee_id: { $exists: true }}).populate('investee_id').sort({ createdAt: -1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.sendInvesteeMessage =async(req,res,io)=>{
    try {
        let message = await Chat.create({
           message: req.body.newMessage,
           chat_id: req.body.roomId,
           investee_id: req.user
          });
          message = await Chat.findById(message._id).populate('investee_id');
          if(io){
              io.emit(`${req.body.roomId}-new-message`, JSON.stringify(message));
          }
          res.json({
            status: true,
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.sendInvesteeSupportMessage =async(req,res,io)=>{
    try {
        let message = await Chat.create({
           message: req.body.newMessage,
           chat_id: req.body.roomId,
           investee_id: req.user,
           chatType: 'support'
          });
          message = await Chat.findById(message._id).populate('investee_id');
          if(io){
              io.emit(`${req.body.roomId}-new-message`, JSON.stringify(message));
          }
          res.json({
            status: true,
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getMessagesInvestee =async(req,res,io)=>{
    try {
          message = await Chat.find( {chat_id : req.params.roomId}).populate('investee_id').sort({ createdAt: 1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getSupportMessagesInvestee =async(req,res,io)=>{
    try {
          message = await Chat.find( {chat_id : req.params.roomId}).populate('investee_id').sort({ createdAt: 1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getAllChatsInvestee =async(req,res)=>{
    try {
          message = await Chat.find({investor_id: { $exists: true }}).populate('investor_id').sort({ createdAt: -1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getAllChatsAdmin =async(req,res)=>{
    try {
          message = await Chat.find({chatType:'support'}).populate('investor_id investee_id').sort({ createdAt: -1 });
          console.log(message)
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.sendAdminSupportMessage =async(req,res,io)=>{
    try {
        let message = await Chat.create({
           message: req.body.newMessage,
           chat_id: req.body.roomId,
           admin_id: req.user,
           chatType: 'support'
          });
          message = await Chat.findById(message._id).populate('admin_id');
          if(io){
              io.emit(`${req.body.roomId}-new-message`, JSON.stringify(message));
          }
          res.json({
            status: true,
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
exports.getSupportMessagesAdmin =async(req,res,io)=>{
    try {
          message = await Chat.find( {chat_id : req.params.roomId}).populate('admin_id').sort({ createdAt: 1 });
          res.json({
            status: true,
            message
        });
        
    } catch (error) {
        res.json({ message: error.message, status: false });
        
    }
}
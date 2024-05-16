const mongo = require('mongoose');

const ChatSchema = new mongo.Schema({
    message: {
        type: String,
        min: [2, 'Minimum message Length is 2 required!!'],
        required: [true, 'Message  is Required']
    },
    chat_id: {
        type: String,
      
        required: [true, 'ProjectId is Required!!']
    },
    investor_id: {
        type: String,
        ref: 'Investor',
    },
    investee_id: {
        type: String,
        ref: 'Investee',
    },
    admin_id: {
        type: String,
        ref: 'Admin',
    },
    chatType:{
        type:String
    }
} , {
    timestamps: true
  })

ChatSchema.set('timestamps', true)



const Chat = mongo.model('Chat', ChatSchema);
module.exports = Chat
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
        // type: mongo.Types.ObjectId,
        type: String,
        ref: 'Investor',
        // required: [true, 'Investor Id is Required!!']
    },
    investee_id: {
        // type: mongo.Types.ObjectId,
        type: String,
        ref: 'Investee',
        // required: [, 'Investee Id is Required!!']
    },
    // files : {
    //     type: Array,
    //     default: []
    // },
} , {
    timestamps: true
  })

ChatSchema.set('timestamps', true)



const Chat = mongo.model('Chat', ChatSchema);
module.exports = Chat
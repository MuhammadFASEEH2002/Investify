const mongo = require('mongoose');

const NotificationSchema = new mongo.Schema({
   id:{
    type: String,
    required: true,
   },
    message:{
        type:String,
        required:true
    }

})

const Notification = mongo.model('Notification' , NotificationSchema);

module.exports = Notification;

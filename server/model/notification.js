const mongo = require('mongoose');

const NotificationSchema = new mongo.Schema({
    investorId: {
        type: String,
    },
    investeeId: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
    }

},
    {
        timestamps: true
    }
)

const Notification = mongo.model('Notification', NotificationSchema);

module.exports = Notification;

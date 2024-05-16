const mongo = require("mongoose");

const adminSchema = new mongo.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean
},
});

const Admin = mongo.model("Admin", adminSchema);

module.exports = Admin;

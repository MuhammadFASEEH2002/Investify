const mongo = require('mongoose');

const InvestorSchema = new mongo.Schema({
   
    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type : String,
        required : true
    },

    cnic:{
        type : String,
        unique:true,
        required : true
    },

    phoneNumber:{
        type : Number,
        unique:true,
        required : true
    },

    dateOfBirth:{
        type:Date,
        required:true
    },

    country:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

})

const Investor = mongo.model('Investor' , InvestorSchema);

module.exports = Investor;

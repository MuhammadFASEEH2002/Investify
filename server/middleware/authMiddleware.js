
const jwt = require('jsonwebtoken')

const verifyToken = async (req , res , next)=>{
    if(!req.headers.token) res.json({ message : 'User not Authorized'})
 
    const result = await jwt.decode(req.headers.token , "admin") 
    if(result){
        req.user = result.id;
        next()
    }else{
        res.json({ message : 'User not Authorized, Invalid Token'})
    }
 }
 module.exports = verifyToken
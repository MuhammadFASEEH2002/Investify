
const jwt = require('jsonwebtoken')

const verifyToken = async (req , res , next)=>{
    if(!req.headers.token) res.json({ message : 'User not Authorized'})
 
    const result = await jwt.decode(req.headers.token , "Aeiou.123") 
    if(result){
        req.user = result.id;
        next()
    }else{
        res.json({ message : 'User not Authorized, Invalid Token'})
    }
 }
 module.exports = verifyToken
 const verifyAdminToken = async (req , res , next)=>{
    if(!req.headers.adminToken) res.json({ message : 'User not Authorized'})
 
    const result = await jwt.decode(req.headers.adminToken , "admin") 
    if(result){
        req.user = result.id;
        next()
    }else{
        res.json({ message : 'User not Authorized, Invalid Token'})
    }
 }
 module.exports = verifyAdminToken
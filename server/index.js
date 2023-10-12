const express = require('express')
const app = express();
const mongo = require('mongoose')
const env = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3001
// const verifyToken = require('./middleware/verifyToken')
// const AuthRouter = require('./controller/Auth')

mongo.connect(process.env.MONGO_URL)
.then(res => console.log('MongoDB connected'))
.catch(err => console.log('MongoDb Connection Failed' , err))


app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cors())


// app.get('/' ,verifyToken , function(req , res){
//     res.json({ user : req.user })
// })

// app.use('/auth' , AuthRouter)



app.listen(PORT , ()=> console.log(`Listening on http://localhost:${PORT}`))
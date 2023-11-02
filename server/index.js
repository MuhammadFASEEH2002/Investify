const express = require("express");
const app = express();
const mongo = require("mongoose");
// const env = require('dotenv').config()
const cors = require("cors");
const PORT = 3001;
// const verifyToken = require('./middleware/verifyToken')
const AuthRouter = require("./controllers/Auth");

mongo
  .connect("mongodb://127.0.0.1:27017/Investify")
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.get('/' ,verifyToken , function(req , res){
//     res.json({ user : req.user })
// })

app.use("/Auth", AuthRouter);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

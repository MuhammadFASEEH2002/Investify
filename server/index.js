const express = require("express");
const app = express();
const mongo = require("mongoose");
// const env = require('dotenv').config()
const cors = require("cors");
const PORT = 3001;
const AuthRouter = require('./routes/authRoutes')
const AdminRouter = require('./routes/adminRoutes')
const InvesteeRouter = require('./routes/investeeRoutes')
const InvestorRouter = require('./routes/investorRoutes')

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000","https://investify-client-navy.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
mongo
  .connect("mongodb+srv://investify180:Aeiou.123@investify.xeqvluf.mongodb.net/")
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());
app.use(express.static('upload'));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/investee", InvesteeRouter);
app.use("/api/investor", InvestorRouter);
app.get("/",(req,res)=>{
  res.json("hello")
})



app.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));

const express = require("express");
const { Server } = require("socket.io");
const app = express();
const { createServer } = require('node:http');
const mongo = require("mongoose");
const env = require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT;
const AuthRouter = require('./routes/authRoutes')
const AdminRouter = require('./routes/adminRoutes')
const InvesteeRouter = require('./routes/investeeRoutes')
const InvestorRouter = require('./routes/investorRoutes')
console.log(process.env.MONGO_URL)
app.use(
  cors({
    origin: [`${process.env.ORIGIN_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// using web sockets
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.ORIGIN_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
mongo
  .connect(`${process.env.MONGO_URL}`)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/investee", InvesteeRouter);
app.use("/api/investor", InvestorRouter);
app.get("/",(req,res)=>{
  res.json("hello")
})

server.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));
// module.exports = { io };

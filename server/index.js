const express = require("express");
const app = express();
const mongo = require("mongoose");
// const env = require('dotenv').config()
const cors = require("cors");
const PORT = 3001;
// const verifyToken = require('./middleware/verifyToken')
// const AuthRouter = require("./controllers/Auth");
const AuthRouter = require('./routes/authRoutes')
const AdminRouter = require('./routes/adminRoutes')
const InvesteeRouter = require('./routes/investeeRoutes')



app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
mongo
  .connect("mongodb://127.0.0.1:27017/Investify")
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));

app.use(express.json());
app.use(express.static('upload'));
app.use(express.urlencoded({ extended: true }));

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-password',
//   },
// });

app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/investee", InvesteeRouter);



app.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));

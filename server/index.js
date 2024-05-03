const express = require("express");
const app = express();
const mongo = require("mongoose");
const env = require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT;
const AuthRouter = require('./routes/authRoutes')
const AdminRouter = require('./routes/adminRoutes')
const InvesteeRouter = require('./routes/investeeRoutes')
const InvestorRouter = require('./routes/investorRoutes')
const cron = require('node-cron');
const Listing = require("./model/listing");

const { Server } = require('socket.io');
const { createServer } = require('node:http');
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.ORIGIN_URL}`,
    methods: ["GET", "POST"],
    credentials: true
  }
});

const ChatRouter = require('./routes/chatRoutes')(io)



app.use(
  cors({
    origin: [`${process.env.ORIGIN_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
app.get("/", (req, res) => {
  res.json("hello")
})
cron.schedule('0 0 * * *', async () => {

  const listing = await Listing.find()
  // console.log(listing)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const formattedCurrentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  listing.map(async (listing) => {
    if (listing?.investment_end_date) {
      if(listing.investment_end_date == formattedCurrentDate) {
        console.log(listing.investment_end_date)
        await Listing.findByIdAndUpdate({ _id: listing?._id }, {
          isInvestmentEnded: true
        })
        console.log("done")
      }
      // console.log(listing.investment_end_date)
    }
  })
});

io.on('connection', (socket) => {
  console.log('a user connected' , socket.id);
});

app.use('/api/chat' , ChatRouter )

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


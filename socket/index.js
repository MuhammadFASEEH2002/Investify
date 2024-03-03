const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const {Server} = require('socket.io');

const app = express();
const server = require('http').Server(app);


dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongo
  .connect(`${process.env.MONGO_URL}`)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));
// Middleware
const io = new Server(server, {
  cors: {
    origin: `${process.env.ORIGIN_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  addTrailingSlash: false
});

// API Routes
// const messagesRouter = require('./routes/messages');
// app.use('/messages', messagesRouter);

// Start server
server.listen(port, () => {
  console.log(`Socket running on port ${port}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors middleware
const databaseConnection = require('./config/databaseConnection');
const dotenv = require("dotenv");
const authRoutes = require('./routes/authRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const stickyNoteRoutes = require('./routes/stickyNoteRoutes');
const containerRoutes = require('./routes/containerRoutes');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

databaseConnection();

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {

  socket.on('textUpdate', (data) => {
    console.log('Received text update from client:', data);
    // Broadcast the text update to all clients including the sender
    socket.broadcast.emit('textUpdate', data)
  });

  socket.on('position', (data) => {
    console.log('Received position from client:', data);
    // Broadcast the text update to all clients including the sender
    socket.broadcast.emit('position', data)
  });
});


io.on('disconnect', () => {
  log('user disconnected')
})

app.use("/api/user", authRoutes);
app.use('/api/workspace', workspaceRoutes);
app.use('/api/stickynote', stickyNoteRoutes);
app.use('/api/container', containerRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

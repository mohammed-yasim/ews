const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors'); // Import cors

const corsOptions = {
  origin: ['http://example.com', 'http://www.example.com'] // Replace with your allowed origins
};

app.use(cors(corsOptions)); // Enable CORS with options

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle HTTP GET requests
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast a message to all connected clients
  socket.on('chat message', (msg) => {
    console.log('Message received: ', msg);
    io.emit('chat message', msg);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(port, () => console.log(`Server running on port ${port}`));

let users = [];
let connections = [];

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log('Here comes a new user!');
  socket.emit('news', { hello: 'world' });
});

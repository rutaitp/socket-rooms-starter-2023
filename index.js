//Express server setup
let express = require('express');
let app = express();

//Serve public folder
app.use(express.static('public'));

//STEP 2. HTTP Server
let http = require('http');
let server = http.createServer(app);

//Listen
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server is listening on localhost: ' + port);
});

//STEP 3. Socket connection
let io = require('socket.io');
io = new io.Server(server);
// console.log(io);

//For reference
// const { Server } = require("socket.io");
// const io = new Server(server);

//STEP 3.2 Establish socket connection & log id
io.on('connection', (socket) => {
  console.log('We have a new client: ' + socket.id);

  //Step 6. Listen for data coming in
  socket.on('data', (data) => {
    // console.log(data);

    //Step 7. Emit data to other clients
    //Send to all clients, including us
    io.emit('data', data);

    //Send to all clients, except us
    // socket.broadcast.emit('data', data);

    //Send only to ourselves
    // socket.emit('data', data);
  });

  socket.on('colorChange', () => {
    io.emit('colorChange');
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected: ', socket.id);
  });
});

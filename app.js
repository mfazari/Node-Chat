const express = require('express');
const app = express();
var path = require('path');

//room
var room;


//set the template engine ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

//
app.get('/', (req, res) => {
	res.render('index')
});


//Listen on port 3000
server = app.listen(3000);


//socket.io instantiation
const io = require("socket.io")(server);


//listen on every connection
io.on('connection', function(socket) {
	console.log('New user connected');

	//default username
	socket.username = "Anonymous";

    //listen on change_username
    socket.on('change_username', function(data) {
        socket.username = data.username;
        console.log("username changed");
    });

    //listen on new_message
    socket.on('new_message', function(data){
        //broadcast the new message to all clients in certain room
        room = data.current_room;

        // work on this part below

        io.sockets.emit('new_message', {message : data.message, username : socket.username});

        //work on this part above
        console.log(data.message);
    });



    //listen on typing
    socket.on('typing', function(data) {
        //broadcast the new message to all clients in room except the one it is being called on
        room = data.current_room;
    	socket.broadcast.in(room).emit('typing', {username : socket.username})
    });


    //Handle a disconnect
    socket.on('disconnect', function(data) {
        console.log("User " + socket.username + " disconnected");
        io.sockets.in(room).emit('disconnect', {username : socket.username});
    });


    //Chat
    // listen for a custom event from the client and join that room
    socket.on('join', function(room) {
        socket.join(room);
        console.log("connected to " + room);
        });

});

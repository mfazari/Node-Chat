const express = require('express');
const app = express();


//set the template engine ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));


//routes
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
        socket.username = data.username
    });

    //listen on new_message
    socket.on('new_message', function(data){
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    //listen on typing
    socket.on('typing', function(data) {
    	socket.broadcast.emit('typing', {username : socket.username})
    })


    /*

    var connectCounter;
    socket.on('connect', function() { connectCounter++; });
    socket.on('disconnect', function() { connectCounter--; });


    socket.on('user', function(data){
        $('#num-users').text(data.currentUsers+' users online');
        var message = data.username;
        if(data.connected) {
            message += ' has joined the chat.';
        } else {
            message += ' has left the chat.';
        }
        $('#messages').append($('<li>').html('<b>'+ message +'<\/b>'));
    });
*/

});

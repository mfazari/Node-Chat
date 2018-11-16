$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000');

	//buttons and inputs
	var message = $("#message");
	var username = $("#username");
	var send_message = $("#send_message");
	var send_username = $("#send_username");
	var chatroom = $("#chatroom");
	var feedback = $("#feedback");


	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()});
	});

	//Listen on new_message
	socket.on("new_message", function(data) {
        //sets feedback back to 0 aka message was sent
		feedback.html('');
		//sets value back to 0 aka message was sent
		message.val('');
		// Adds HTML/EJS code to end of referred ID. In this case "chatroom"
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	});

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()
		});

	});

	//Emit event typing
	message.bind("keypress", function() {
		socket.emit('typing'); //emit event
	});

	//Listen on event typing
	socket.on('typing', function(data) {
	    //implement that username is required before message
	    //if(data.username)
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	});

	//handle a disconnect
	socket.on('disconnect', function(data){
        feedback.html('');
        chatroom.append("<p class='message'>" + data.username + " " + "HAS LEFT ROOM" + "</p>")
	});


	//room
    $("#room2").click(function(){
        console.log("clicked");
        socket.emit('join', 'room');
    });


});



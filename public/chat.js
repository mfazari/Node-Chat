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

	//rooms
    var room_1 = $("#room1");
    var room_2 = $("#room2");
    var room_3 = $("#room3");
    var current_room;   //Gives status


    //Connected at beginning to default room (Room 1)
    socket.emit('join', 'room1');
    current_room = room_1;


	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val(), current_room: current_room});
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
		socket.emit('change_username', {username : username.val()});

	});

	//Emit event typing
	message.bind("keypress", function() {
		socket.emit('typing',{current_room: current_room}); //emit event
	});

	//Listen on event typing
	socket.on('typing', function(data) {
        room = data.current_room;
        current_room = data.current_room;
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	});

	//handle a disconnect
	socket.on('disconnect', function(data){
        feedback.html('');
        chatroom.append("<p class='message'>" + data.username + " " + "HAS LEFT ROOM" + "</p>")
	});




	//rooms
    room_1.click(function(){
        socket.emit('join', 'room1');
        current_room = room_1;
    });

    room_2.click(function(){
        socket.emit('join', 'room2');
        current_room = room_2;
    });

    room_3.click(function(){
        socket.emit('join', 'room3');
        current_room = room_3;
    });

});



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


    //Connected at beginning to default room (Room1)
    socket.emit('join', 'room1');
    current_room = 'room1';


	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val(), current_room: current_room});
	});

    //Emit event typing
    message.bind("keypress", function() {
        socket.emit('typing',{current_room: current_room}); //emit event
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


	//Listen on event typing
	socket.on('typing', function(data) {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	});



	//handle a disconnect
	socket.on('disconnect', function(data){
        feedback.html('');
        chatroom.append("<p class='message'>" + data.username + " " + "HAS LEFT ROOM" + "</p>")
	});







	//Choose a room
    room_1.click(function(){
        socket.emit('join', 'room1');
        current_room = 'room1';
    });

    room_2.click(function(){
        socket.emit('join', 'room2');
        current_room = 'room2';
    });

    room_3.click(function(){
        socket.emit('join', 'room3');
        current_room = 'room3';
    });




    //Send message listens to enter
    var input = document.getElementById("message");
    input.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("send_message").click();
        }
    });

});



//express
var express = require('express');

//express
var app = express();

//socket.io instance
var io = require("socket.io")(server);


//view engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'))

//routes

app.get('/', (req, res) => {

    res.render('index');

});


//listen everywhere
io.on('connection', (socket) => {
    console.log('New user connected')
});




//listen on port 3000
var server = app.listen(3000);


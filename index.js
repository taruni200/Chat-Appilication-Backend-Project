var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("page");
});

var server = app.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});

var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat', username: 'Server' });

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});


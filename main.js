var app = require('express')()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { joinUser, removeUser } = require('./users');

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
let thisRoom = '';
io.on("connection", function (socket) {
    console.log("connected");
    socket.on("join room", (data) => {
        console.log("in room");
        let Newuser = joinUser(socket.id, data.username, data.roomName)
        socket.emit('send data', { id: socket.id, username: Newuser.username, roomName: Newuser.roomname })
        thisRoom = Newuser.username;
        console.log(Newuser);
        socket.join(Newuser.roomname)
    })

    socket.on("chat message", (data) => {
        io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    })
})

http.listen(3000);
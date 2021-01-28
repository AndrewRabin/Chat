const io = require('socket.io')();
const socketapi = {
    io: io,
};

// Add your socket.io logic here!
io.on('connection', function (socket) {

    socket.on('message', function (text, cb) {
        socket.broadcast.emit('message', text);
        cb('123');
    });
});
// end of socket.io logic

module.exports = socketapi;

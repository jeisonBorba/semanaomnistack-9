const socketio = require('socket.io');

const connectedUsers = {};
let io;

function setupWebsocket(server) {
    io = socketio(server);
    
    io.on('connection', socket => {
        const { user_id } = socket.handshake.query;
        console.log(user_id)
        
        connectedUsers[user_id] = socket.id;
    });

    return io;
}

const getConnectedUsers = () => connectedUsers;

module.exports = {
    setupWebsocket,
    getConnectedUsers
}
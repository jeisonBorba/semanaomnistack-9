const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

const { setupWebsocket, getConnectedUsers } = require ('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

const { port, databaseUrl, databaseUser, databaseKey } = require('./config');

mongoose.connect(`mongodb+srv://${databaseUser}:${databaseKey}@${databaseUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const io = setupWebsocket(server);

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = getConnectedUsers();

    return next();
});


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
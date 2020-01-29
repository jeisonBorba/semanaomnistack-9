const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path =require('path');

const { port, databaseUrl, databaseUser, databaseKey } = require('./config');

mongoose.connect(`mongodb+srv://${databaseUser}:${databaseKey}@${databaseUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routes = require('./routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
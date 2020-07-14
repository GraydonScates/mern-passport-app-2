const mongoose = require('mongoose');
const models = require('../models');

const dbURL = process.env.MONGOD_URI;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

const db = {
    connection: mongoose.connection,
    ...models
};

module.exports = db;
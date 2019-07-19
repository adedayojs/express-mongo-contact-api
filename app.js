'use strict';
const http = require('http');
const express = require('express');
const log = require('morgan');
const contactsApi = require('./routes/contactsApi');

// Create your connection
const app = express();

//  Specify Your Port or other enviroment variables
const PORT = process.env.PORT || 5000;

//  Set Your Midlewares
app.use(express.json());
app.use(log('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/api/contacts', contactsApi);

// Handle Errors 404
app.use(function(_req, res) {
  res.status(404).end('Not Found');
});

//  Functions to execute on connection and listening
function connect() {
  console.log('Connection established');
}
function listen(soc) {
  console.log('Listening On port ' + PORT);
}
const httpServer = http.createServer(app);
httpServer.listen(PORT);
httpServer.on('connection', connect);
httpServer.on('listening', listen);

'use strict';
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const log = require('morgan');

// Create your connection
const app = express();

//  Set Your Midlewares
app.use(express.json());
app.use(log('dev'));
app.use(express.urlencoded({ extended: true }));
app.use('/api/contacts', contactsApi);

// Handle Errors 404
app.use(function(_req, _res, next) {
  next(createError(404));
});

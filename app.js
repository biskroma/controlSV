'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Rutas
var rutas_usr = require('./rutas/usuario');
var rutas_borr = require('./rutas/borrego')

app.use( bodyParser.urlencoded( {extended:false} ) );
app.use( bodyParser.json() );

// Cabeceras HTTP

// Rutas Base
app.use('/api', rutas_usr );
app.use('/api', rutas_borr);

module.exports = app;
'use strict'

var express = require('express');
var ControladorUsuario = require('../controladores/usuario');

var api = express.Router();

api.get('/prueba-controlador', ControladorUsuario.pruebas);
api.post('/guarda-usuario', ControladorUsuario.guardarUsuario);
api.post('/ingresa-usuario', ControladorUsuario.ingresarUsuario);

module.exports = api;

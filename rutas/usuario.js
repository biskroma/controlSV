'use strict'

var express = require('express');
var ControladorUsuario = require('../controladores/usuario');

var api = express.Router();
var md_aut = require('../middlewares/autenticado');

api.get('/prueba-controlador', md_aut.asegurarCredencial, ControladorUsuario.pruebas);
api.post('/guarda-usuario', ControladorUsuario.guardarUsuario);
api.post('/ingresa-usuario', ControladorUsuario.ingresarUsuario);
api.put('/actualiza-usuario/:id', md_aut.asegurarCredencial, ControladorUsuario.actualizarUsuario);

module.exports = api;

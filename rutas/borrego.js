'use strict'

var express = require('express');
var ControladorBorrego = require('../controladores/borrego')

var api = express.Router();
var md_aut = require('../middlewares/autenticado')

api.get('/obtener-borrego', md_aut.asegurarCredencial, ControladorBorrego.obtenerBorrego);
api.put('/guardar-borrego', md_aut.asegurarCredencial, ControladorBorrego.guardarBorrego);

module.exports = api;
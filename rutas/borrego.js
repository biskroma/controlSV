'use strict'

var express = require('express');
var ControladorBorrego = require('../controladores/borrego')

var api = express.Router();
var md_aut = require('../middlewares/autenticado')

api.get('/obtener-borrego/:id', md_aut.asegurarCredencial, ControladorBorrego.obtenerBorrego);
api.get('/obtener-borregos/:pagina?', md_aut.asegurarCredencial, ControladorBorrego.obtenerBorregos);
api.put('/actualizar-borrego/:id', md_aut.asegurarCredencial, ControladorBorrego.actualizarBorrego);
api.post('/guardar-borrego', md_aut.asegurarCredencial, ControladorBorrego.guardarBorrego);
api.get('/obtener-tatuaje/:tatuaje', md_aut.asegurarCredencial, ControladorBorrego.obtenerTatuaje);

module.exports = api;
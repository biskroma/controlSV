'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaUsuario = Schema(
    {
        nombre: String,
        email: String,
        clave: String,
        papel: String
    }
);

module.exports = mongoose.model('Usuario', SchemaUsuario);
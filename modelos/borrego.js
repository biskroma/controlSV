'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaBorrego = Schema(
    {
        _tatuaje: String,
        _arete: String,
        _sexo: String,
        _nacimiento: Date,
        _entrada: Date,
        _salida: Date,
        _baja: Date,
        _partos: Number,
        _parto_ordinal: Number,
        _peso_nacimiento: Number,
        _peso_destete: Number,
        _peso_actual: Number,
        _padre: { type: Schema.ObjectId, ref: 'Borrego' },
        _madre: { type: Schema.ObjectId, ref: 'Borrego' }
    }
);

module.exports = mongoose.model('Borrego', SchemaBorrego);
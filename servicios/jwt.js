'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var clave_maestra = 'clave_maestra';

exports.crearToken = function(usuario)
{
    var carga = 
    {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        papel: usuario.papel,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(carga, clave_maestra);
}
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var clave_maestra = 'clave_maestra';

exports.asegurarCredencial = function(req, res, next)
{
    if (!req.headers.authorization) 
    {
        return res.status(403).send({mensaje: 'La petición no tiene la cabecera de autenticación'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var carga = jwt.decode(token, clave_maestra);
        if (carga.exp <= moment().unix()) {
            return res.status(401).send({mensaje: 'El token expiró...'});
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({mensaje: 'El token no es válido...'});
    }
    req.usuario = carga;
    next();
};
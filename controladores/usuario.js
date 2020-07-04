'use strict'

var Usuario = require('../modelos/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt');

function pruebas(req, res)
{
    res.status(200).send(
        {
            mensaje: 'Probando acción de controlador de usuario del API Rest con Node y Mongo...'
        }
    );
}

function guardarUsuario(req, res)
{
    var usuario = new Usuario();
    var parametros = req.body;
    console.log(parametros);
    usuario.nombre = parametros.nombre;
    usuario.email = parametros.email;
    usuario.clave = parametros.clave;
    usuario.papel = parametros.papel;

    if (parametros.clave) 
    {
        // Encripta la contraseña, y guarda los datos
        bcrypt.hash(parametros.clave, null, null,
            function(err, hash)
            {
                usuario.clave = hash;
                if (usuario.nombre != null && usuario.email != null && usuario.papel != null) 
                {
                    //Guarda los datos del usuario
                    usuario.save( (err, usuarioGuardado) =>
                        {
                            if (err) 
                            {
                                res.status(500).send({mensaje: 'Error al guardar el usuario...'});
                            } else 
                            {
                                if (!usuarioGuardado) 
                                {
                                    res.status(404).send({mensaje: 'Usuario no registrado...'});
                                } else 
                                {
                                    res.status(200).send( {usuario: usuarioGuardado} );
                                }
                            }
                        }
                    );
                } else 
                {
                    res.status(200).send({mensaje: 'Existen campos vacíos...'});
                }
            }
        );
    } else
    {
        res.status(200).send({mensaje: 'Introduce la contraseña...'});
    }
}

function ingresarUsuario(req, res)
{
    var parametros = req.body;
    var email = parametros.email;
    var clave = parametros.clave;
    Usuario.findOne( {email: email.toLowerCase()}, (err, usuario)=>
        {
            if (err) 
            {
                res.status(500).send( {mensaje: 'Error en la consulta...'} );
            } else 
            {
                if (!usuario) 
                {
                    res.status(404).send( {mensaje: 'Usuario no registrado... '} );
                } else 
                {
                    // Comprobar clave
                    bcrypt.compare(clave, usuario.clave, (err, check)=>
                        {
                            if (check) 
                            {
                                // Devolver datos del usuario
                                if (parametros.gethash) 
                                {
                                    // Devolver token jwt
                                    res.status(200).send( {token: jwt.crearToken(usuario)} );
                                } else 
                                {
                                    res.status(200).send({usuario});
                                }
                            } else 
                            {
                                res.status(404).send( {mensaje: 'Contraseña incorrecta... '} );
                            }
                        }
                    );
                }
            }
        }
    );
}

function actualizarUsuario(req, res)
{
    var idUsuario = req.params.id;
    var actualizar = req.body;
    Usuario.findByIdAndUpdate(idUsuario, actualizar, (err, usuarioActualizado) =>
        {
            if (err) 
            {
                res.status(500).send({mensaje: 'Error al actualizar al usuario'});    
            } else 
            {
                if(!usuarioActualizado)
                {
                    res.status(404).send({mensaje: 'No se logró la actualización del usuario'});
                } else
                {
                    res.status(200).send({usuario: usuarioActualizado});
                }
            }
        }
    );
}

module.exports =
    {
        pruebas, guardarUsuario, ingresarUsuario, actualizarUsuario
    };
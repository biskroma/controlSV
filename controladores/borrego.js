'use strict'

var path = require('path');
var fs = require('fs');
var Borrego = require('../modelos/borrego');

function guardarBorrego(req, res)
{
    var borrego = new Borrego();
    var parametros = req.body;
    console.log(parametros);
    
    borrego._tatuaje = parametros.tatuaje;
    borrego._arete = parametros.arete;
    borrego._sexo = parametros.sexo;
    borrego._nacimiento = parametros.nacimiento;
    borrego._entrada = parametros.entrada;
    borrego._partos = parametros.partos;
    borrego._parto_ordinal = parametros.partoOrdinal;
    borrego._peso_nacimiento = parametros.pesoNacimiento;
    borrego._peso_destete = parametros.pesoDestete;
    borrego._peso_actual = parametros.pesoActual;
    
    // Guardar los datos del borrego
    borrego.save( (err, borregoGuardado) =>
            {
                if (err) 
                {
                    res.status(500).send({mensaje: 'Error al ingresar los datos del borrego'});
                } else 
                {
                    if (!borregoGuardado) 
                    {
                        res.status(404).send({mensaje: 'No se registraron los datos del borrego'});    
                    } else 
                    {
                        res.status(200).send(
                            {
                                borrego: borregoGuardado
                            }
                        );    
                    }
                }
            }
        );
}

function obtenerBorrego(req, res)
{
    var idBorrego = req.params.id;
    Borrego.findById(idBorrego, (err, borrego)=>
        {
            if (err) 
            {
                res.status(500).send({mensaje: 'El servidor envió un error desconocido...'});
            } else 
            {
                
            }
        }
    );
}

module.exports =
    {
        guardarBorrego,
        obtenerBorrego
    }
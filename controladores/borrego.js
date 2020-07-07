'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
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
                if (!borrego) 
                {
                    res.status(404).send({mensaje: 'No se encontró el identificador de ganado...'});
                } else 
                {
                    res.status(200).send(borrego);
                }
            }
        }
    );
}

function obtenerTatuaje(req, res)
{
    var tatuajeBorrego = req.params.tatuaje;
    Borrego.findOne({_tatuaje:tatuajeBorrego}, (err, borrego)=>
        {
            if (err) 
            {
                res.status(500).send({mensaje: 'Ocurrió un error de conexión con la base de datos...'});
            } else 
            {
                if (!borrego) 
                {
                    res.status(404).send({mensaje: 'No se encontró el identificador de arete..'});
                } else 
                {
                    res.status(200).send(borrego);
                }
            }
        }
    );
}

function obtenerBorregos(req, res)
{
    if (req.params.page) 
    {
        var pagina = req.params.page;
    } else 
    {
        var pagina = 1
    }
    var elementosPagina = 3;

    Borrego.find().sort('_tatuaje').paginate(pagina, elementosPagina, (err, borregos, total)=>
        {
            if (err) 
            {
                res.status(500).send({mensaje: 'Error en la petición'});    
            } else 
            {
                if (!borregos) 
                {
                    res.status(404).send({mensaje: 'El ganado no está registrado en la base de datos...'});
                } else 
                {
                    return res.status(200).send(
                        {
                            elementos_total: total,
                            borregos: borregos
                        }
                    );
                }
            }
        }
    );
}

function actualizarBorrego(req,res)
{
    var idBorrego = req.params.id;
    var actualizar = req.body;

    Borrego.findByIdAndUpdate(idBorrego, actualizar, (err, borregoActualizado)=>
        {
            if (err) 
            {
                res.status(500).send({mensaje: 'Error en la petición a la base de datos...'});
            } else 
            {
                if (!borregoActualizado) 
                {
                    res.status(404).send({mensaje: 'No se encuentra el registro de ganado...'});    
                } else 
                {
                    res.status(200).send({borrego: borregoActualizado});
                }    
            }
        }
    );
}

module.exports =
    {
        guardarBorrego,
        obtenerBorrego,
        obtenerBorregos,
        obtenerTatuaje,
        actualizarBorrego
    }
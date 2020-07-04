'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/controlganadosv', {useNewUrlParser: true, useUnifiedTopology: true,}, (err, res) =>
    {
        if (err) 
        {
            throw err;
        } else 
        {
            console.log('Conexión a BD exitosa...');
            app.listen(port, ()=>
                {
                    console.log('Escuchando conexión desde http://localhost:' + port);
                }
            );
        }
    }
);
'use strict';

var express = require('express'),
    app = express(),
    port = 80,
    server = undefined;

global.appRoot = __dirname;
app.use(express.static(__dirname));

server = app.listen(port, function() {
    console.log('Servidor iniciado en puerto: ' + port + ', proceso: ' + process.pid);
});

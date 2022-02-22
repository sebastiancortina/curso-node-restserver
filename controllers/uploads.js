const { response } = require('express');

const cargarArchivo = (req, res = response ) => {
    res.json( {
        msg: 'hola mundo'
    });
}

module.exports = {
    cargarArchivo
} 
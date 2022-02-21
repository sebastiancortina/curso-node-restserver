const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');
const usuario = require('../models/usuario');


const colecionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuario = async ( termino = '', res = response ) => {

    // Valida si existe el id en mogo 
    const esMongoId = ObjectId.isValid( termino ); // True 
    
    if( esMongoId ) {
        // Devuelve un objeto del usuarario que se desea buscar 
        const usuario = await Usuario.findById(termino);

        res.json({
            results: [ usuario ]
        });

    }else{
        res.json({
            // Si el usuario no exite devuelve un arreglo vacio 
            results: []
        });

    }
   

}


const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params;

    if( ! colecionesPermitidas.includes( coleccion )){
        return res.status(400).json( {
            msg: `Las coleccion permitidas son: ${ colecionesPermitidas }`
        })
    }

    switch ( coleccion ){
        case 'usuarios':
            buscarUsuario(termino, res);
            break;

        case 'categoria':
            break;

        case 'productos':
            break;
        
        default: 
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }

}

module.exports = {
    buscar
}
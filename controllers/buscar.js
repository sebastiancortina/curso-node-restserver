const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');
const usuario = require('../models/usuario');


const colecionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

// Buscar Usuario
const buscarUsuario = async ( termino = '', res = response ) => {

    // Valida si existe el id en mogo 
    const esMongoId = ObjectId.isValid( termino ); // True 
    
    if( esMongoId ) {
        // Devuelve un objeto del usuarario que se desea buscar 
        const usuario = await Usuario.findById(termino);

        res.json({
            results: (usuario) ? [ usuario ] : []
        });

    }

    const regex = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex}, {correo: regex }],
        $and: [{ estado: true}]
    });

    res.json({
        results: usuarios
    });
}

// Busca Categoria
const buscarCategoria = async ( termino = '', res = response ) => {

    // Valida si existe el id en mogo 
    const esMongoId = ObjectId.isValid( termino ); // True 
    
    if( esMongoId ) {
        // Devuelve un objeto del usuarario que se desea buscar 
        const categorias = await Categoria.findById(termino);

        res.json({
            results:  (categorias) ? [ categorias ] : []
        });

    }

    const regex = new RegExp( termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true});

    res.json({
        results: categorias
    });
   

}

// Buscar Producto
const buscarProducto = async ( termino = '', res = response ) => {

    // Valida si existe el id en mogo 
    const esMongoId = ObjectId.isValid( termino ); // True 
    
    if( esMongoId ) {
        // Devuelve un objeto del usuarario que se desea buscar 
        const producto = await Producto.findById(termino).populate('categoria','nombre');

        res.json({
            results:   (producto) ? [ producto ] : []
        });

    }

    const regex = new RegExp( termino, 'i');
    const productos = await Producto.find({ nombre: regex, estado: true});

    res.json({
        results: productos
    });
   

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

        case 'categorias':
            buscarCategoria(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
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
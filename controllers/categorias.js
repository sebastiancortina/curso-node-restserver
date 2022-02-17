const { response } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async (req, res = response) => {

   const nombre = req.body.nombre.toUpperCase();

   const categoriaDB = await Categoria.findOne({nombre});

   if(categoriaDB){
       return res.status(400).json({
           msg: `la categoria ${ categoriaDB.nombre }, ya exite`
    });
   }

   // Generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // guardar db
    await categoria.save();

    res.status(201).json(categoria);
}

const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categoria ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            //.populate('usuario','nombre')
            .skip(Number (desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categoria
    })
}

const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id );

    res.json( categoria );

}

const actualizarCategorias = async (req, res = response) => {

}

const borrarCategorias = async (req, res = response) => {

}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategorias,
    borrarCategorias
};
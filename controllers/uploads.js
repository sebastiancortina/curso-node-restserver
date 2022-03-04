const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto} = require ('../models');

const cargarArchivo = async (req, res = response ) => {

    try{
        // txt, md 
        //    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({ nombre })

    } catch (msg){
        res.status(400).json({ msg });
    }

}

const actualizarImagen = async (req, res = response ) => {

    const {id, coleccion } = req.params;

    switch (coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break; 

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});       
    }

    // Limpiar imagenes previas
    if( modelo.img){
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImage) ){
            fs.unlinkSync(pathImage);
        }
    }
    

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response ) => {

    const {id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break; 

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});       
    }

    // Limpiar imagenes previas
    if( modelo.img){
        const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImage) ){
            return res.sendFile( pathImage )
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );
}

const actualizarImagenCloudinary = async (req, res = response ) => {

    const {id, coleccion } = req.params;

    let modelo;

    switch (coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break; 

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});       
    }

    // Limpiar imagenes previas
    if( modelo.img){
      
    }

    const { tempFilePath } = req.files.archivo
    const resp = await cloudinary.uploader.upload( tempFilePath );

    res.json( resp );

    //cloudinary.uploader.upload( )
    
    /*
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);*/
}







module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
} 
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');  // libreria para sifrar la contraseña
const Usuario = require('../models/usuario');




const usuarioGet = (req = request, res = response ) => {
    
    // desetructuramos con las variablles que necesitamos 
    const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;

    res.json( {
        msg: 'get Api - controlador',
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });
}

const usuarioPost = async (req, res = response ) => {

    // Se resibe la informacion riques
    //const { nombre, edad } = req.body;

    // se crea la instancia para mandar la informacion a mogoDB
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Cifra la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Se graba la informacion en la base de datos 
    await usuario.save();


    res.json( {
        usuario
    });
}

const usuarioPut = async (req, res = response ) => {

   const { id } = req.params;
   const { _id, password, google, correo, ...resto } = req.body;

   // Todo validar contra base de datos 
   if( password ){
       // Cifra la contraseña 
       const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync(password, salt);
   }

   const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( {
        msg:"put api",
        usuario
    });
}

const usuarioPath = (req, res = response ) => {
    res.json( {
        msg:"path api"
    });
}

const usuarioDelete = (req, res = response ) => { 
    res.json( {
        msg:"delete api"
    });
}


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPath,
    usuarioDelete
}
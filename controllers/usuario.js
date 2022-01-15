const { response, request } = require('express');


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

const usuarioPost = (req, res = response ) => {

    // Se resibe la informacion riques
    const { nombre, edad } = req.body;


    res.json( {
        msg:"post api",
        nombre,
        edad
    });
}

const usuarioPut = (req, res = response ) => {

    const id = req.params.id;

    res.json( {
        msg:"put api",
        id
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
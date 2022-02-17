
const Role = require('../models/role'); // colecion de rol 
const {Usuario, Categoria } = require('../models');


// Permite validar un rol exitente en la base de datos 
const esRoleValido = async(rol = '') => {                 
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

 // Verifica si el correo existe - npm i express-validator es una coleccion de Middleware
const emailExists = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    //console.log('iojhoj');
    if ( existeEmail){
        throw new Error(`El correo: ${ correo }, ya esta registrado` );
    }
}

const existeUsuarioPorId = async(id) => {
    // Verifica si exite el id exite 
    const existeUsuario = await Usuario.findById(id);
    
    if (!existeUsuario){
        throw new Error(`El id no exite ${ id }`);
    }
}

// Validadores categorias 
const existeCategoriaPorId = async (id) => {
    
    // Verifica si la categoria existe 
    const existeCategoria = await Categoria.findById(id);
    if (! existeCategoria ) {
        throw new Error(`El id no exite ${ id }`);
    }
}


module.exports = {
    esRoleValido,
    emailExists, 
    existeUsuarioPorId,
    existeCategoriaPorId
}

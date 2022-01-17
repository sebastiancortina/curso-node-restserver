const Role = require('../models/role'); // colecion de rol 

// Permite validar un rol exitente en la base de datos 
const esRoleValido = async(rol = '') => {                 
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}


module.exports = {
    esRoleValido
}
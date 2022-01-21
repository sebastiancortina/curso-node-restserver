const { response, request } = require('express');

const esAdminRole = ( req = request, res = response, next ) => {
    if(!req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    
    const {rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre } no es admistrador - No puede hacer esto`
        });
    }

    next();
}

const 

module.exports = {
    esAdminRolebvf
}
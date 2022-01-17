const { validationResult } = require('express-validator');



// Permite controlar las validaciones

const validarCampos = ( req, res, next ) =>  {

    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    }
    // Permite continuar con el siguiente Middlewares con si la validacion es correcta 
    next();

}

module.exports = {
    validarCampos
}
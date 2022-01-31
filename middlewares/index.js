
const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const esAdminRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRoles
}
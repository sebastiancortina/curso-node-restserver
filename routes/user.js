// Desestrutura un paquete de express
const { Router } = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuario');
// coleccion de Mi
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExists, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// Mandamos un objetos
router.get('/', usuarioGet);

const prueba = (req) => {

    console.log('hola'+req);
};

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuarioPut);

router.post('/', [
    // permite revizar algun campo de la coleccion
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    // permite verificar si el campo esta vacio
    check('password', 'El password es obligatorio y debe ser mas de 6 caracteres').isLength({ min: 6 }), // permite validar si el campo tiene mas de 6 caracteres 
    check('correo').custom(emailExists).isEmail(), // permite verificar si el correo esta correcto 
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),  // permite validar si es un usuario ADMIN_ROLE o USER_ROLE
    check('rol').custom(esRoleValido),  // Permite validar un rol exitente en la base de datos 
    validarCampos
], usuarioPost);
//-----------------------------------------
router.delete('/:id',[
    validarJWT,
   // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTA_ROLE'),
    check('id', 'No es un id valido').isMongoId(),   
    check('id').custom(existeUsuarioPorId),
    validarCampos],
    usuarioDelete);
//-----------------------------
router.patch('/', (req, res) => {
    res.status(403).json( {
        msg:"patch api"
    });
});


module.exports = router;
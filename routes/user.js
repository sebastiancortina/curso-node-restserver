// Desestrutura un paquete de express
const { Router } = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuario');
// coleccion de Mi
const { check } = require('express-validator');
const { esRoleValido, emailExists, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')


const router = Router();

// Mandamos un objetos
router.get('/', usuarioGet);

const prueba = (req) => {

    console.log('hola'+req);
};

//------------------- PUT --------------------
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuarioPut);

//------------------- POST --------------------------------
router.post('/', [
    // permite revizar algun campo de la coleccion
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    // permite verificar si el campo esta vacio
    check('password', 'El password es obligatorio y debe ser mas de 6 caracteres').isLength({ min: 6 }), // permite validar si el campo tiene mas de 6 caracteres 
    check('correo').custom(emailExists).isEmail(), // permite verificar si el correo esta correcto 
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),  // permite validar si es un usuario ADMIN_ROLE o USER_ROLE
    check('rol').custom(esRoleValido),  // Permite validar un rol exitente en la base de datos 
    validarCampos
], usuarioPost);

//------------------- DELETE --------------------------------
router.delete('/:id',[
    validarJWT,
<<<<<<< HEAD
    esAdminRole,
    tieneRole('ADMIN_ROLE','A' ),
=======
   // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTA_ROLE'),
>>>>>>> 733bc57aaf60e44a6326da394e01cae4777a85df
    check('id', 'No es un id valido').isMongoId(),   
    check('id').custom(existeUsuarioPorId),
    validarCampos],
    usuarioDelete);

//-------------------- PATCH -----------------------------------
router.patch('/', (req, res) => {
    res.status(403).json( {
        msg:"patch api"
    });
});


module.exports = router;
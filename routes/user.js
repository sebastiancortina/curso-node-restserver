// Desestrutura un paquete de express
const { Router } = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuario');
// coleccion de Mi
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role'); // colecion de rol 
const router = Router();

// Mandamos un objetos
router.get('/', usuarioGet);

router.put('/:id', usuarioPut);

router.post('/', [
    // permite revizar algun campo de la coleccion
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    // permite verificar si el campo esta vacio
    check('password', 'El password es obligatorio y debe ser mas de 6 caracteres').isLength({ min: 6 }), // permite validar si el campo tiene mas de 6 caracteres 
    check('correo', 'El correo no es valido ').isEmail(), // permite verificar si el correo esta correcto 
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),  // permite validar si es un usuario ADMIN_ROLE o USER_ROLE
    check('rol').custom( async(rol = '') => {                   // Permite validar un rol exitente en la base de datos 
        const existeRol = await Role.findOne({ rol });
        if( !existeRol ){
            throw new Error(`El rol ${ rol } no esta registrado en la BD`)
        }
    }),
    validarCampos
], usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', (req, res) => {
    res.status(403).json( {
        msg:"patch api"
    });
});





module.exports = router;
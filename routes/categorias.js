const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const router = Router();
const { crearCategoria,  obtenerCategoria, obtenerCategorias, actualizarCategorias, borrarCategorias } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

/*
* {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categorias por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria);

// Crear una categoria - privado- cualquier persona con un token valido
router.post('/', [ 
    validarJWT, 
    check('nombre', 'el nombre es obligatorio').not().isEmpty() ,
    validarCampos
], crearCategoria);

// Actualizar - privado- cualquier persona con un token valido
router.put('/:id',[
    validarJWT, 
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,actualizarCategorias );

// Borrar una categoria - Admin
router.delete('/:id',[ 
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaPorId ), 
    validarCampos
] ,borrarCategorias );



module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const router = Router();
const { crearCategoria,  borrarCategorias, obtenerCategoria, actualizarCategorias, } = require('../controllers/categorias');

/*
* {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', obtenerCategoria);

// Obtener una categorias por id - publico
router.get('/:id', obtenerCategoria);

// Crear una categoria - privado- cualquier persona con un token valido
router.post('/', [ 
    validarJWT, 
    check('nombre', 'el nombre es obligatorio').not().isEmpty() ,
    validarCampos
], crearCategoria);

// Actualizar - privado- cualquier persona con un token valido
router.put('/:id', actualizarCategorias);

// Borrar una categoria - Admin
router.delete('/:id', borrarCategorias);



module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');

const router = Router();


/*
* {{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
  res.json('get ')
});

// Obtener una categorias por id - publico
router.get('/:id', (req, res) => {
    res.json('get id');
});

// Crear una categoria - privado- cualquier persona con un token valido
router.post('/:id', (req, res) => {
    res.json('post');
});

// Actualizar - privado- cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});



module.exports = router;

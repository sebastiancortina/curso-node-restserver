// Desestrutura un paquete de express
const { Router } = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuario');

const router = Router();

// Mandamos un objetos
router.get('/', usuarioGet);

router.put('/:id', usuarioPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', (req, res) => {
    res.status(403).json( {
        msg:"patch api"
    });
});





module.exports = router;
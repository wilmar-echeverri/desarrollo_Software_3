const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async (req, res) => {
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin], [
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ mensaje: errores.array() });
        }
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.name = req.body.name;
        estadoEquipo.status = req.body.status;
        estadoEquipo.createdAt = new Date();
        estadoEquipo.updatedAt = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;

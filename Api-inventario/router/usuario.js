const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const router = Router();
const bcrypt = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
        console.log('conexión exitosa');
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin], [
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('status', 'invalid.status').isIn(['Activo', 'Inactivo']),
    check('password', 'invalid.password').not().isEmpty(),
    check('role', 'invalid.role').isIn(['Administrador', 'Docente'])
], async function(req, res) {
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ mensaje: errores.array() });
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario(); // Usa new Usuario() aquí
        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.status = req.body.status;

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.role = req.body.role;
        usuario.createdAt = new Date();
        usuario.updatedAt = new Date();
        usuario = await usuario.save(); // Usa await aquí
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;

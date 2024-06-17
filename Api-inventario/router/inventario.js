const {Router} = require('express');
const Inventarios = require('../models/Inventarios');
const {validationResult, check} = require('express-validator');
const router = Router();
const {validarJWT} = require('../middleware/validar-jwt');
const {validarRolAdmin} = require('../middleware/validar-rol-admin');
router.get('/',[validarJWT], async function(req, res){
    try{
        const inventarios= Inventarios.find().populate([
            {
                path:'usuario', select: 'name email status'
            },
            {
                path: 'marca', select: 'name status'
            },
            {
                path: 'estadoEquipo', select: 'name status'
            },
            {
                path: 'tipoEquipo', select: 'name status'
            }
        ]);
        res.send(inventarios);
        console.log('conexión exitosa');
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
})
router.post('/',[validarJWT, validarRolAdmin], [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('fotoEquipo', 'invalid.fotoEquipo').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().isEmpty(),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty()
    ], async function(req, res){
        try{
            const errores = validationResult(req);
            if (!errores.isEmpty()){
                return res.status(400).json({mensaje: errores.array()});
            }
            const existeinventarioPorSerial = await Inventarios.findOne({serial: req.body.email});
            if (existeinventarioPorSerial){
                return res.status(400).send('Serial ya existe');
            }
            let inventario = Inventario();
            inventario.serial = req.body.serial;
            inventario.modelo = req.body.modelo;
            inventario.descripcion = req.body.descripcion;
            inventario.fotoEquipo = req.body.fotoEquipo;
            inventario.color = req.body.color;
            inventario.fechaCompra = req.body.fechaCompra;
            inventario.precio = req.body.precio;
            inventario.usuario = req.body.usuario;
            inventario.marca = req.body.marca;
            inventario.estadoEquipo = req.body.estadoEquipo;
            inventario.tipoEquipo = req.body.tipoEquipo;
            inventario.createdAt = new Date();
            inventario.updatedAt = new Date();
            inventario = await inventario.save();
            res.send(inventario);
        }catch(error){
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
})

module.exports = router;
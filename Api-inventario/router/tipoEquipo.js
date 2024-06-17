const {Router} = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validationResult, check} = require('express-validator');
const router = Router();
const {validarJWT} = require('../middleware/validar-jwt');
const {validarRolAdmin} = require('../middleware/validar-rol-admin');
router.get('/', [validarJWT, validarRolAdmin], async function(req, res){
    try{
        const tipoEquipos= TipoEquipo.find()
        res.send(tipoEquipos);
        console.log('conexión exitosa');
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
})
router.post('/',[validarJWT, validarRolAdmin], [
    check('name','invalid.name').not().isEmpty(),
    check('status','invalid.status').not().isIn(['Activo', 'Inactivo'])
    ], async function(req, res){
        try{
            const errores = validationResult(req);
            if (!errores.isEmpty()){
                return res.status(400).json({mensaje: errores.array()});
            }
            let tipoEquipo = TipoEquipo();
            tipoEquipo.name = req.body.name;
            tipoEquipo.status = req.body.status;
            tipoEquipo.createdAt = new Date();
            tipoEquipo.updatedAt = new Date();
            tipoEquipo = await tipoEquipo.save();
            res.send(tipoEquipo);
        }catch(error){
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
})

module.exports = router;
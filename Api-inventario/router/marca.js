const {Router} = require('express');
const Marca = require('../models/Marca')
const {validationResult, check} = require('express-validator');
const router = Router();
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')
router.get('/',[validarJWT, validarRolAdmin], async function(req, res){
    try{
        const marcas= Marca.find()
        res.send(marcas);
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
            const errores = validationResult(req)
            if (!errores.isEmpty()){
                return res.status(400).json({mensaje: errores.array()});
            }
            let marca = Marca();
            marca.name = req.body.name;
            marca.status = req.body.status;
            marca.createdAt = new Date();
            marca.updatedAt = new Date();
            marca = await marca.save();
            res.send(marca);
        }catch(error){
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
})

module.exports = router;
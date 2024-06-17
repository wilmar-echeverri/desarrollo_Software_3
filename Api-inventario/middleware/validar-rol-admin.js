const jwt = require('jsonwebtoken');
const validarRolAdmin = (req, res, next) => {
    if (req.payload.rol !== 'Administrador') {

        return res.status(401).json({ mensaje: req.payload.rol});

    }
    next();
};

module.exports = {
    validarRolAdmin
};

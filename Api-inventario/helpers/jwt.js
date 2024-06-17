const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, name: usuario.name, email: usuario.email,
        password: usuario.password, role: usuario.role, status: usuario.status };
    const token = jwt.sign(payload, '1234567', { expiresIn: '2h' });
    return token;
}

module.exports = {
    generarJWT
}
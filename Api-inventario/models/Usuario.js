const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Administrador', 'Docente'], required: true },
    status: { type: String, enum: ['Activo', 'Inactivo'], required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = model('User', UserSchema);

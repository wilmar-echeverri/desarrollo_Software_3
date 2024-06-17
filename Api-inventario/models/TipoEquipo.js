const {Schema, model} = require('mongoose');

const TipoEquipoSchema = Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['Activo', 'Inactivo'], required: true},
    createdAt: { type: Date, required: true},
    updatedAt: { type: Date, required: true}
});


module.exports = model('User', TipoEquipoSchema);

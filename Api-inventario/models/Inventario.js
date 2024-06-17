const {Schema, model} = require('mongoose');

const InventarioSchema = Schema({
    serial: { type: String, required: true, unique: true},
    modelo: { type: String, required: true},
    descripcion: { type: String, required: true },
    fotoEquipo: { type: String, required: true },
    color: { type: String, required: true },
    fechaCompra: { type: Date, required: true},
    precio: { type: Number, required: true },
    usuario: { type: Schema.type.ObjectId, ref:"Usuario"},
    marca: { type: Schema.type.ObjectId, ref:"Marca", required: true},
    estadoEquipo: { type: Schema.type.ObjectId, ref:"EstadoEquipo", required: true},
    tipoEquipo: { type: Schema.type.ObjectId, ref:"TipoEquipo", required: true},
    createdAt: { type: Date, required: true},
    updatedAt: { type: Date, required: true}
});

module.exports = model('User', InventarioSchema);

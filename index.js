const express = require('express');
const {getConnection} = require('./db/db-connection-mongo');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/auth',require('./router/auth'));
app.use('/usuario',require('./router/usuario'));
//app.use('/estado-equipo',require('./router/estadoEquipo'));
//app.use('/inventario',require('./router/inventario'));
//app.use('/tipo-equipo',require('./router/tipoEquipo'));
//app.use('/marca',require('./router/marca'));
getConnection();
app.listen(port, () => {
    console.log(`Example listening ${port}`);
});
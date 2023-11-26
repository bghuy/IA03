const express = require('express')
const path = require('path');//require path to get to folder
require('dotenv').config();
const app = express()
const port = process.env.PORT || 8888;
const hostname = process.env.HOST || 'localhost';
const configViewEngine = require('./src/config/viewEngine.js');
const webRoutes = require('./src/routes/web.js');


configViewEngine(app);
//config route
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
app.use('/', webRoutes);

app.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`)
})
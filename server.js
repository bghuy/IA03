const express = require('express')
const path = require('path');//require path to get to folder
require('dotenv').config();
const app = express()
const port = process.env.PORT || 8081;
const hostname = process.env.HOST || 'localhost';
const CustomError = require('./src/modules/customerr.js');
const configViewEngine = require('./src/config/viewEngine.js');
const webRoutes = require('./src/routes/web.js');


configViewEngine(app);
//config route
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
app.use('/', webRoutes);
app.use(function (req, res, next) {
    res.status(404).render('error.html', {
        params: {
            code: 404,
            msg: 'Page not found',
            description: `the page you're looking for doesn't exist`
        }

    })
});
app.use(function (err, req, res, next) {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    res.status(statusCode).render('error.html', {
        params: {
            code: statusCode,
            msg: 'Server error',
            description: err.message
        }
    })
})
app.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`)
})
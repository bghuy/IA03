const pgp = require('pg-promise')({
    capSQL: true
});
const cn = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 8888,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
}
const db = pgp(cn);

module.exports = db;

const Database = require('mysql2');

//connecting to database
const pool = Database.createPool({
    host:"localHost",
    user:"root",
    password: "135790135790@@",
    database:"FOOTBALL_DB",
    connectionLimit:10,
    multipleStatements: true
});

module.exports = pool;
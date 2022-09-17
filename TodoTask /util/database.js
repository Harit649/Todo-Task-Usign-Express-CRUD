const mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Harit@64",
    database : "Todo",
    multipleStatements : true,
    port : 4000
});

db.connect();

// export default db;    

module.exports = db;
const mysql2 = require('mysql2');

const dbconnection = mysql2.createPool({
    user:"evangadi-admin",
    database:"evangadi_db",
    host:"localhost",
    password:"123456",
    connectionLimit: 10,
})



// dbconnection.execute("select 'test'", (err, results) => {
//     if (err) {
//         console.error("Error connecting to the database:", err.message)
//         return;
//     }
//     console.log("Database connection successful:", results)}
// );

module.exports = dbconnection.promise()
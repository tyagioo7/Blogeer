import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "8168631561",
    database: "blogeer_db",
    port: 3306
})

export default db
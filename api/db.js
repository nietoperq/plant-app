import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "plantapp",
});

export default db;

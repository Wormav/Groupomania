import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
});

const dbConnect = db.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

export default db;

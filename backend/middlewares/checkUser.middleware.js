import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const checkUser = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const token = req.cookies.jwt;
      const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;
      const sql = `SELECT id_user FROM users WHERE id_user = ${userId}`;

      db.query(sql, (err, result) => {
        if (err) res.status(204).json(err);
        else next();
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "utlisateur non autorisé" });
    }
  } catch (err) {
    res.clearCookie();
    res.redirect("/");
    console.log(err);
    res.status(401).json({ message: "utlisateur non autorisé" });
  }
};

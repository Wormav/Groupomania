import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const addFollow = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.cookies.jwt;
    const userID = jwt.verify(token, process.env.TOKEN_SECRET).id;
    const sql = `INSERT INTO follows(follow_id_user,follow_id_follow) VALUES(${userID}, ${id});`;

    db.query(sql, (err, result) => {
      if (err) {
        res
          .status(201)
          .json({ message: "impossible de suivre cette utilisateur" });
        throw err;
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const removeFollow = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.cookies.jwt;
    const userID = jwt.verify(token, process.env.TOKEN_SECRET).id;
    const sql = `DELETE FROM follows WHERE follow_id_user = ${userID} AND follow_id_follow= ${id};`;

    db.query(sql, (err, result) => {
      if (err) {
        res
          .status(201)
          .json({ message: "impossible de ne plus suivre cette utilisateur" });
        throw err;
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

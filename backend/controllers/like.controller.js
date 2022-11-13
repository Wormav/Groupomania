import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const addLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const token = req.cookies.jwt;
    const userID = jwt.verify(token, process.env.TOKEN_SECRET).id;
    const sql = `INSERT INTO likes(like_user_id,like_post_id) VALUES(${userID}, ${postId});`;

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

export const removeLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const token = req.cookies.jwt;
    const userID = jwt.verify(token, process.env.TOKEN_SECRET).id;
    const sql = `DELETE FROM likes WHERE like_user_id = ${userID} AND like_post_id= ${postId};`;

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

export const getLike = async (req, res) => {
  try {
    const postId = req.params.id;

    const sql = `SELECT * FROM likes WHERE like_post_id= ${postId};`;

    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
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

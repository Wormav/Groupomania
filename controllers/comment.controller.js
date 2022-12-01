import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const createComment = async (req, res) => {
  try {
    const content = req.body.content;
    const userId = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET).id;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const postId = req.params.id;

    const sql = `INSERT INTO comments(comment_user_id, comment_post_id, comment_content, comment_create_time ) VALUES(${userId},${postId} , "${content}", "${date}");`;

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

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.body.commentId;
    const userId = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET).id;

    const sql = `DELETE FROM comments WHERE id_comment=${commentId} AND comment_user_id=${userId}`;

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
export const getAllComment = async (req, res) => {
  const postId = req.body.postId;

  try {
    const sql = `SELECT * FROM comments WHERE comment_post_id=${postId};`;

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
export const updateComment = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET).id;
    const commentId = req.body.commentId;
    const content = req.body.content;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sql = `UPDATE comments SET comment_content="${content}", comment_update_time="${date}" WHERE id_comment=${commentId} AND comment_user_id=${userId}`;

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

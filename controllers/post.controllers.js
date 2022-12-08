import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  try {
    const content = req.body.content;
    const userId = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET).id;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const sqlContentOnly = `INSERT INTO posts(post_user_id, post_content, post_create_time) VALUES(${userId}, "${content}", "${date}");`;
    if (req.file) {
      const destination = req.file.destination;
      const filename = req.file.filename;
      const imageUrl = "." + destination.substr(8) + "/" + filename;
      const sqlPicture = `INSERT INTO posts(post_user_id, post_content ,post_picture, post_create_time) VALUES (${userId}, "${content}","${imageUrl}", "${date}");`;
      db.query(sqlPicture, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        } else {
          res.status(200).json(result);
        }
      });
    } else {
      db.query(sqlContentOnly, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        } else {
          res.status(200).json(result);
          return;
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const updatePost = async (req, res) => {
  try {
    const content = req.body.content;
    const file = req.file;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const postId = req.params.id;

    const sqlContentOnly = `UPDATE posts SET post_content="${content}", post_upadate_time="${date}" WHERE id_post=${postId} ;`;

    if (!file) {
      db.query(sqlContentOnly, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        } else {
          res.status(200).json(result);
        }
      });
    } else {
      const sqlPicture = `UPDATE posts SET post_content="${content}", post_upadate_time="${date}", post_picture="${req.body.post_image}" WHERE id_post=${postId};`;
      db.query(sqlPicture, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        } else {
          res.status(200).json(result);
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const sql = `DELETE FROM posts WHERE id_post = ${postId};`;

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

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const sql = `SELECT * FROM posts WHERE id_post = ${postId};`;

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

export const getAllPost = async (req, res) => {
  try {
    const sql = `SELECT * FROM posts INNER JOIN users ON posts.post_user_id = users.id_user ;`;

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

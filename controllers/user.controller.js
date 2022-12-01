import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const sql = `SELECT * FROM users WHERE user_activ= 1;`;
    db.query(sql, (err, result) => {
      if (!result) {
        res
          .status(201)
          .json({ message: "erreur requête liste des utilisateurs" });
      } else {
        for (let i = 0; i < result.length; i++) {
          delete result[i].user_password;
        }
        res.status(200).json(result);
      }
    });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id_user = ${id} AND user_activ= 1;`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(201).json({ message: "id erreur" });
      } else if (result.length === 0) {
        res.status(201).json({ message: "utilisateur bloqué !" });
      } else {
        delete result[0].user_password;
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  let bio = req.body.bio;
  if (bio === "") bio = null;
  try {
    if (req.file) {
      const destination = req.file.destination;
      const filename = req.file.filename;
      const imageUrl = "." + destination.substr(8) + "/" + filename;

      const sqlImage = `UPDATE users SET user_picture= "${imageUrl}" WHERE id_user = ${id} AND user_activ= 1;`;
      db.query(sqlImage, (err, result) => {
        if (err) {
          res.status(201).json({ message: "erreur image" });
          throw err;
        }
      });
    }

    const sqlUpdateUser = `UPDATE users SET user_username= "${req.body.username}", user_email= "${req.body.email}", user_bio= "${bio}" WHERE id_user = ${id} AND user_activ= 1`;
    db.query(sqlUpdateUser, (err, result) => {
      if (err) {
        res.status(201).json({ message: "erreur mise à jour utilisateur" });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const disableUser = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `UPDATE users SET user_activ= 0 WHERE id_user= ${id}`;

    db.query(sql, (err, result) => {
      if (err) {
        res
          .status(201)
          .json({ message: "erreur lors de la supprésion de l'utilisateur" });
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

export const reactiveUser = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, process.env.TOKEN_SECRET).id;
  const id = req.params.id;

  const sqlCheckAdmin = `SELECT user_admin FROM users WHERE id_user=${userId} AND user_activ= 1`;

  db.query(sqlCheckAdmin, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      try {
        const admin = result[0].user_admin;

        if (admin === 1) {
          const sql = `UPDATE users SET user_activ=1 WHERE id_user=${id}`;
          db.query(sql, (err, result) => {
            if (err) {
              res.status(201).json({
                message: "erreur lors de la réactivation de l'utilisateur",
              });
              throw err;
            } else {
              res.status(200).json(result);
            }
          });
        } else {
          res.status(201).json({ message: "vous n'ête pas adminitrateur" });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
        return;
      }
    }
  });
};

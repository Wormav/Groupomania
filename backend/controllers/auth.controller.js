import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const sql = `INSERT INTO users(user_username, user_email , user_password , user_create_date) VALUES('${req.body.username}', '${req.body.email}', '${hashedPassword}', '${date}');`;
    db.query(sql, (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email ou Pseudo déjà enregistré" });
      } else {
        res.status(201).json({ message: "Utilisateur crée" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const signIn = async (req, res) => {
  const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: 3 * 24 * 60 * 60 * 1000,
    });
  };
  try {
    // check user exist

    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT id_user, user_username, user_email,user_password FROM users WHERE user_email= '${email}'`;

    db.query(sql, async (err, result) => {
      if (err) {
        return res.status(404).json({ err });
      } else {
        try {
          const passwordInDb = result[0].user_password;
          const id = result[0].id_user;

          const match = await bcrypt.compare(password, passwordInDb);

          if (match) {
            const jwt = createToken(id);
            delete result[0].user_password;
            res.cookie("jwt", jwt, { httpOnly: true, maxAge: maxAge });
            res.status(200).json({
              user: result[0],
              token: jwt,
            });
          } else {
            res.status(200).json({
              error: true,
              message:
                "Le mots de passe ou le mail reseigné ne correspont pas !",
            });
          }
        } catch (err) {
          res.status(500).json({ message: "cette email n'existe pas !" });
          return;
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const signOut = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "utilisiteur déconecté" });
};

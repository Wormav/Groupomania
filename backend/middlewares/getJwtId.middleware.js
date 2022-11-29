import jwt from "jsonwebtoken";

export const getJwtId = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, result) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(result.id);
        res.status(200).json(result.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};

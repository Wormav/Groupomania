import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import followRoutes from "./routes/follow.routes.js";
import likeRoutes from "./routes/like.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import { checkUser } from "./middlewares/checkUser.middleware.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//route
app.use("/api/auth", authRoutes);
app.use("/api/user", checkUser, userRoutes);
app.use("/api/follow", checkUser, followRoutes);
app.use("/api/like", checkUser, likeRoutes);
app.use("/api/post", checkUser, postRoutes);
app.use("/api/comment", checkUser, commentRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_image")
      cb(null, "./client/public/images/posts");
    else if (file.fieldname === "profil_image")
      cb(null, "./client/public/images/profils");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;

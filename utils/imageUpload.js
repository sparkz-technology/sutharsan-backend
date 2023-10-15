import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import constant from "../config/constant.js";

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = constant;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "portfolio",
    allowedFormats: ["jpg", "png"],
    overwrite: true,
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname.split(".")[0]}`;
    },
  },
});

const upload = multer({ storage });

export default upload;

const uploadImage = (req, res, next) => {
  if (!req.file) {
    if (res.method === "PATCH") return next();
    const error = new Error("Please upload a file");
    error.statusCode = 400;
    throw error;
  }
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: err.message,
      });
    } else {
      req.body.imageUrl = req.file.path;
      next();
    }
  });
};

const deleteImage = (imageUrl) => {
  const imageId = imageUrl.split("/").pop().split(".")[0];
  cloudinary.v2.uploader.destroy(imageId, (err, res) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("res", res);
    }
  });
};

export { uploadImage, deleteImage };

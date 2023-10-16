import cloudinary from "cloudinary";
import multer from "multer";
import constant from "../config/constant.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

export default upload;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = constant;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const uploadImage = (req, res, next) => {
  if (!req.file) {
    if (req.method === "PATCH") return next(); // If it's a PATCH request, proceed without an image.
    const error = new Error("Please upload a file");
    error.statusCode = 400;
    return next(error);
  }

  const public_id = `${req.file.originalname}-${Date.now()}`;

  cloudinary.v2.uploader.upload(
    `data:image/png;base64,${req.file.buffer.toString("base64")}`,
    {
      resource_type: "auto",
      public_id: public_id,
      overwrite: true,
    },
    (err, result) => {
      if (err) {
        const error = new Error("Something went wrong while uploading image");
        error.statusCode = 500;
        error.detail = err;
        return next(error);
      }
      req.body.imageUrl = result.secure_url;
      next();
    }
  );
};

const deleteImage = (imageUrl) => {
  const imageId = imageUrl.split("/").pop().split(".")[0];
  cloudinary.v2.uploader.destroy(imageId, (err, res) => {
    if (err) {
      console.error("Error deleting image:", err);
    } else {
      console.log("Image deleted successfully:", res);
    }
  });
};

export { uploadImage, deleteImage };
// export default upload;

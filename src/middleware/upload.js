// src/middleware/upload.js

const multer = require("multer");
const path = require("path");//Built-in Node.js module to manage file paths, Getting extension & making unique filename

// Storage engine — store temporary file in tempUploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempUploads/"); // ✅ your temp folder name
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Only allow image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer object
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;

const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// prefer environment variables; fall back to legacy names if present
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY;
const API_SECRET =
  process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.warn(
    "Cloudinary credentials not fully configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env",
  );
}

cloudinary.config({
  cloud_name: CLOUD_NAME || "",
  api_key: API_KEY || "",
  api_secret: API_SECRET || "",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };

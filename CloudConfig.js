const cloudinary = require("cloudinary").v2;
// multer-storage-cloudinary automatically saves files to Cloudinary and returns the URL.
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "wanderlust-Dev", // Stores images in Cloudinary folder "listings"
        allowedFormats: ["jpeg", "png", "jpg"]
    }
});

module.exports = {
    cloudinary,
    storage
}
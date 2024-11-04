import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is required");
    }
    // Upload an image
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Image uploaded successfully");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default uploadToCloudinary;

// Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", // Image to upload
//       {
//         public_id: "shoes", // Public name
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     // Public name
//     fetch_format: "auto", // Auto-format
//     quality: "auto", // Auto-quality
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     // Public name
//     crop: "auto", // Auto-crop
//     gravity: "auto", // Auto-gravity
//     width: 500, // Width
//     height: 500, // Height
//   });

//   console.log(autoCropUrl); // https://res.cloudinary.com/demo/image/upload/c_crop,g_auto,h_500,w_500/shoes
// })();

const cloud = require('../config/cloud.js')



const uploadToCloudinary = (buffer, options) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloud.uploader.upload_stream(options, (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      });
      uploadStream.end(buffer);
    });
  };

module.exports=uploadToCloudinary;
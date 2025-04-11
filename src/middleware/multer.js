const multer = require("multer");


const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Unsupported file type!'), false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } 
});

const uploadFile = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "images", maxCount: 10 }
]);

module.exports = uploadFile;
import multer from "multer";
import {randomUUID} from "crypto";
import fs from "fs";


export const multerLocal = (customPath= "General", customTypes= []) => {
  
    const path= `uploads/${customPath}`;

      if(!fs.existsSync(path)){
        fs.mkdirSync(path, { recursive: true });
      }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, randomUUID() + "__" + file.originalname);
}
  });

   function fileFilter(req, file, cb) {
    if (!customTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type", {cause: 400}), false);
    } else {
      cb(null, true);
    }
  }

  
  const upload = multer({ storage, fileFilter });
  return upload;
}





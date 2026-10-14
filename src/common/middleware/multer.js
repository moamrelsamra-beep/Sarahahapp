import multer from "multer";
import {randomUUID} from "crypto";
import fs from "node:fs";


export const multerLocal = ({customPath= "General", customTypes= []} = {}) => {
  
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

   const fileFilter = (req, file, cb) => {
    console.log({file})
    if (!customTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    } else {
      cb(null, true);
    }
  }

  
  const upload = multer({ storage, fileFilter });
  return upload;
}





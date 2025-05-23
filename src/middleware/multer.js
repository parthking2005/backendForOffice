import multer from "multer";    
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve("public/temp"); 
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {  
        let filemimeType = file.mimetype;
        let extension = filemimeType.lastIndexOf('/');
        let getExtension = filemimeType.substr(extension+1);
        let filenameCreated = file.fieldname + '-' + Date.now() + '.' + getExtension;
      cb(null, filenameCreated)
    }
  })
  

export const upload = multer({ storage: storage })
// import express  from "express";
// import {upload} from "../controllers/upload.js"
// import multer from 'multer'
// const router = express.Router();

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, '../public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }

// })
// var uploadfile = multer({
//     storage: storage
// });


// router.post('/',uploadfile.single('image'),upload)


// export default router
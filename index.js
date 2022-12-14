import express from 'express'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path'
import bodyParser from 'body-parser'
import { db } from './db.js'

const app = express()

app.use(express.static("./public"))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    {extended:true}
))
app.use(express.json())


db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp" || file.mimetype == "image/gif") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg ,webp, .gif and .jpeg format allowed!'));
        }
      }
});

app.post("/post", upload.single('image'), (req, res) => {
    if (!req.file) {
      const q =" UPDATE users SET username =?,email=? WHERE id = ?;"
       db.query(q,[req.body.username ,req.body.email,req.body.id ],(err,data)=>{
        if(err) return res.send(err);
        res.send("updated profile data ")
       })
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:8000/images/' + req.file.filename
        var insertData = " UPDATE users SET username =?,email=?, profile =? WHERE id =?;"

        db.query(insertData, [req.body.username ,req.body.email,imgsrc,req.body.id ], (err, result) => {
            if (err) throw err
            res.send("success")
            console.log("file uploaded")
        })
    }
});

app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes) 
app.use('/api/auth',authRoutes)
// app.use('api/upload',uploadRoute)


app.listen(8000,()=>{
    console.log("connected")
})
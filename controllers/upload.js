// import {db} from "../db.js"

// export const upload =(req,res)=>{
//     console.log("working")
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         console.log(req.file.filename)
//         var imgsrc = 'http://127.0.0.1:8000/images/' + req.file.filename
//         var insertData = "INSERT INTO users_file(file_src,u_id)VALUES(?,?)"
//         db.query(insertData, [imgsrc,req.body.u_id], (err, result) => {
//             if (err) throw err
//             res.send("success")
//             console.log("file uploaded")
//         })
//     } 
// }



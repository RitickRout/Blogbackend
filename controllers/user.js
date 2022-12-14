import { db } from "../db.js";
import jwt from "jsonwebtoken";
import e from "express";

export const user =(req,res)=>{
// jwt.verify(req.token,'jwtkey',(err,authData)=>{
//   if(err){
//     res.sendStatus(403);
//     console.log("error in edituser",err)
//   }else {
//   }
// })
const q ="SELECT title, img , description,Category, username ,profile FROM posts INNER JOIN users ON posts.uid = users.id where posts.id = ? AND users.id =posts.uid;"
db.query(q,[req.body.id],(err,data)=>{
   if(err)return res.json(err)
       return res.json(data);
})
}
export const editUser = (req,res)=>{

  jwt.verify(req.token,'jwtkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log("error in edituser",err)
    }else{
      const q ="UPDATE users SET username = ?,email=? WHERE id = ?;"
      db.query(q,[req.body.username , req.body.email, req.body.id],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
      })
    }
  })
 
}


export const userData = (req,res)=>{

  jwt.verify(req.token,'jwtkey',(err,authData)=>{
    if(err){
      res.sendStatus(403)
      console.log("error in userrdata",err)
    }else{
      const q = " SELECT * FROM users WHERE (username = ? OR email =?) &&  id != ?;"
      db.query(q,[req.body.username , req.body.email,req.body.id],(err,data)=>{
        if(err)return res.json(err)
        if(data.length) return res.json("user already exists")
        return res.json("success")
      })
    }
  })

}

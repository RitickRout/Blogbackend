import { db } from "../db.js";
import jwt from "jsonwebtoken";
//all posts 
export const allPosts = (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
        return res.json(data);
  });
};
// edit post
export const edit = (req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
    //console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q = "UPDATE posts SET title =?,img=?,description=?,Category=? WHERE id =?;"
      db.query(q,[req.body.title,req.body.img,req.body.description,req.body.Category,req.body.id],(err,data)=>{
       if(err)return res.json(err)
          return res.json(data)
      })
    }
  });

}

//fetch selected post to show data 

export const fetchSelected =(req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
   // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q = "SELECT * FROM posts WHERE id=?;"

      db.query(q,[req.body.id],(err,data)=>{
           if(err) return res.json(err)
           return res.json(data)
      })
    }
  });



}
/// delete post
export const deletePost=(req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
   // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q ="DELETE FROM posts WHERE id = ?;"
 
      db.query(q,[req.body.id],(err,data)=>{
          if(err)return res.json(err)
          return res.json(data)
      })
    }
  });

}
//posting a blog
export const postBlog =(req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
    console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q ="INSERT INTO posts(uid,img,title,description,Category) VALUES (?,?,?,?,?);"
      db.query(q,[req.body.uid,req.body.img,req.body.title,req.body.description,req.body.category],(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
    }
  });

}


// user data for a particular post
export const userData = (req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
   // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q = `SELECT *
      FROM posts
      INNER JOIN users
      ON posts.uid = users.id
      where uid =?;`;
    
      db.query(q,[req.body.id],(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
      })
    }
  });

}


// all posts for a particular user

export const userposts = (req,res)=>{
  jwt.verify(req.token, 'jwtkey', (err, authData) => {
   // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q = "SELECT  * FROM posts WHERE uid = ?;"

      db.query(q,[req.body.id], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
      })
    }
  });


}


// all comments for the particular post 
export const showComments =(req,res)=>{
  // jwt.verify(req.token, 'jwtkey', (err, authData) => {
  //   console.log(authData)
  //   if(err) {
  //     res.sendStatus(403);
  //   } else {
      const q = "SELECT username ,profile,comment ,createdAt   FROM users INNER JOIN comments ON users.id = comments.uid WHERE comments.pid=?;"

      db.query(q,[req.body.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
      })
    }

// post comment by user
export const postComments = (req,res)=>{

  jwt.verify(req.token, 'jwtkey', (err, authData) => {
   // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      const q  = "INSERT INTO comments(pid,uid,comment) VALUES (?,?,?);"
      db.query(q,[req.body.pid,req.body.uid,req.body.comment],(err,data)=>{
        if(err) return res.json(err)
           return res.json(data)
      })
    }
  });



}





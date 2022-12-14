import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
   
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?'
  db.query(query, [req.body.email, req.body.username], (err, data) => {

      if (err) return res.json(err);
      if (data.length) return res.status(409).json("User already exists!")

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const query = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)'
      const values = [
          req.body.username,
          req.body.email,
          hash
      ]  
        
      db.query(query,[values],(err,data)=>{
          if(err) return res.json(err);
          return res.status(200).json("User has been created")
      })
  })
}

export const login = (req, res) => {
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?'

  db.query(query,[req.body.email,req.body.email],(err,data)=>{
      if(err)return res.json(err)
      if(data.length ==0)return res.status(404).json("Wrong username or password");

      const passwordCheck =bcrypt.compareSync(req.body.password, data[0].password);

      if(!passwordCheck) return res.status(400).json("Wrong username or password")

      if(passwordCheck){
          const token = jwt.sign({id:data[0].id},"jwtkey");
          const {password ,...other}=data[0]
         res.status(200).json({token,other})
      }
  
  })

}


export const updateProfile = (req, res) => {
     const q = "SELECT username , id , profile ,email FROM users WHERE id =?;"
     
     db.query(q,[req.body.id],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
     })
};

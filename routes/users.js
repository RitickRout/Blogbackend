import express from "express"
import {user,editUser,userData} from "../controllers/user.js"

const router = express.Router()
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

router.post('/',verifyToken,user) // user data and post for specific id 
router.post('/edituser',verifyToken,editUser) // edit data of the user profile 
router.post('/checkuserdata',verifyToken,userData)// checking for the username and email existance 
export default router


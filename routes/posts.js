import express from 'express'
import { allPosts ,userData,edit,userposts,showComments ,postComments,fetchSelected,deletePost,postBlog} from '../controllers/post.js'
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


router.get('/',allPosts) // all posts data 
router.post('/',verifyToken,userData) //users all posts 
router.post('/edit',verifyToken,edit) // edit post 
router.post('/allblogs',verifyToken,userposts) // all current users posts 
router.post('/comments',showComments ) // all comments for particular post
router.post('/fetchsinglepost',verifyToken,fetchSelected) // fetching single post data 
router.post('/postblog',verifyToken,postBlog) // posting the blog
router.post('/delete',verifyToken,deletePost) // delete post 
router.post('/postcomment',verifyToken,postComments) //posting comment by particular user
export default router
const router = require('express').Router();
const verify = require('../routes/VerifyToken');
const postCtrl = require('../controllers/Post.Controller');

/* router.get('/',verify,(req,res)=>{
  res.json({posts:{title: 'My first post', description:' Random data you shouldnt access without login'}});
}); */

//List all post from DB
router.get('/list', postCtrl.getAllPost);

//Get post by ID
router.get('/get/:id', postCtrl.getPostById);

//Only register user can add a new post
router.post('/add', verify, postCtrl.savePost);

//Update post
router.put('/update/:id', verify, postCtrl.updatePost);

//Delete post
router.delete('/delete/:id', verify, postCtrl.deletePost);

module.exports = router;
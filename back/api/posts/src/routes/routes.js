const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/auth');
const postController = require('../controllers/PostController');

router.post('/create', authMiddleware, postController.createPost);
router.get('/my-posts', authMiddleware, postController.myPosts);
router.get('/', authMiddleware, postController.getPosts);

module.exports = router;
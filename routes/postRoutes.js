// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 获取所有博客文章
router.get('/', postController.getAllPosts);

// 获取单个博客文章
router.get('/:id', postController.getPostById);

// 创建新的博客文章
router.post('/', postController.createPost);

// 更新博客文章
router.put('/:id', postController.updatePost);

// 删除博客文章
router.delete('/:id', postController.deletePost);

module.exports = router;

// controllers/postController.js
const db = require('../config/db');

// 获取所有博客文章
exports.getAllPosts = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT posts.id, posts.title, posts.content, posts.created_at, posts.updated_at, users.username 
             FROM posts JOIN users ON posts.user_id = users.id 
             ORDER BY posts.created_at DESC`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '获取博客文章失败' });
    }
};

// 获取单个博客文章
exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const [rows] = await db.query(
            `SELECT posts.id, posts.title, posts.content, posts.created_at, posts.updated_at, users.username 
             FROM posts JOIN users ON posts.user_id = users.id 
             WHERE posts.id = ?`, [postId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: '博客文章未找到' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '获取博客文章失败' });
    }
};

// 创建新的博客文章
exports.createPost = async (req, res) => {
    const { user_id, title, content } = req.body;
    if (!user_id || !title || !content) {
        return res.status(400).json({ message: '缺少必要字段' });
    }
    try {
        const [result] = await db.query(
            `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`,
            [user_id, title, content]
        );
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '创建博客文章失败' });
    }
};

// 更新博客文章
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
        const [result] = await db.query(
            `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
            [title, content, postId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '博客文章未找到' });
        }
        res.json({ message: '博客文章更新成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '更新博客文章失败' });
    }
};

// 删除博客文章
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const [result] = await db.query(
            `DELETE FROM posts WHERE id = ?`,
            [postId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '博客文章未找到' });
        }
        res.json({ message: '博客文章删除成功' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '删除博客文章失败' });
    }
};

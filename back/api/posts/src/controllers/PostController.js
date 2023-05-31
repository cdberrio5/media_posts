const jwt          = require('jsonwebtoken');
const Post         = require('./../models/Post');

require('dotenv').config();

class PostController {
    static async createPost(req, res) {
        const { title, description } = req.body;

        if(!title) {
            return res.status(406).json({ message: 'Faltan parametros' });
        }

        if(!description) {
            return res.status(406).json({ message: 'Faltan parametros' });
        }

        try {
            Post.createPost(title, description, req.userId)

            return res.json({ message: 'Post creado!' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }

    static async myPosts(req, res) {
        const { page, date } = req.query;

        try {

            const posts = await Post.getMyPosts(page, date, req.userId);

            posts.total = await Post.getCountPosts("", date, req.userId);
            posts.pages = posts.total > 0 ? Math.round(posts.total / 2) : 0;

            return res.status(200).json(posts);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }

    static async getPosts(req, res) {
        const { page, search, date } = req.query;

        try {
            const posts = await Post.getPosts(page, search, date);

            posts.total = await Post.getCountPosts(search, date);
            posts.pages = posts.total > 0 ? Math.round(posts.total / 2) : 0;

            return res.status(200).json(posts);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }
}

module.exports = PostController;
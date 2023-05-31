const db = require('./../database/db');

class Post {
    static getPosts(page = 1, search = "", date = "") {
        return new Promise((resolve, reject) => {
            const offset = page - 1;
            const limit = 2;

            const searchQuery = search ? `AND title like '%${search}%'` : "";
            const dateQuery   = date ? `AND date_created >= '${date} 00:00:00' AND date_created <= '${date} 23:59:59'` : "";

            const query = `SELECT id, (select full_name from users where id = id_user) as name, title, description, date_created FROM posts where 1 = 1 ${searchQuery} ${dateQuery} ORDER BY id desc LIMIT ${offset}, ${limit}`;
            db.query(query, [], (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {

                    const out = {
                        posts: results[0].total == 0 ? [] : results
                    }

                    return resolve(out);
                }
                
                
            });
        })
    }

    static getMyPosts(page = 1, date = "", userId) {
        return new Promise((resolve, reject) => {
            const offset = page - 1;
            const limit = 2;

            const dateQuery   = date ? `AND date_created >= '${date} 00:00:00' AND date_created <= '${date} 23:59:59'` : "";

            const query = `SELECT count(id) as total, id, (select full_name from users where id = id_user) as name, title, description, date_created     FROM posts where 1 = 1 ${dateQuery} and id_user = '${userId}' ORDER BY id LIMIT ${offset}, ${limit}`;

            db.query(query, [], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const pages = results.length > 0 ? Math.round(results[0].total / 2) : 0;

                    const out = {
                        pages,
                        posts: results
                    }

                    return resolve(out);
                }
            });
        })
    }

    static createPost(title, description, userId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO posts (title, description, id_user) VALUES (?, ?, ?)';

            db.query(query, [title, description, userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    static getCountPosts(search = "", date = "", userId = "") {
        return new Promise((resolve, reject) => {
            const searchQuery = search ? `AND title like '%${search}%'` : "";
            const dateQuery   = date ? `AND date_created >= '${date} 00:00:00' AND date_created <= '${date} 23:59:59'` : "";
            const userQuery   = userId ? `AND id_user = '${userId}'` : "";

            const query = `SELECT count(*) as records FROM posts where 1 = 1 ${searchQuery} ${dateQuery} ${userQuery}`;
            db.query(query, [], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    return resolve(results[0]["records"]);
                }
            });
        })
    }
}

module.exports = Post;

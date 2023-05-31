const db = require('./../database/db');

class User {
    static getByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';

            db.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static async createUser(fullName, email, password) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';

            db.query(query, [fullName, email, password], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }
}

module.exports = User;

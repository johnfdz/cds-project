import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    const [rows, fields] = await connection.execute(
        'SELECT * FROM users'
    );
    if (rows.length > 0) {
        res.json({
            id: rows[0].id,
            username: rows[0].username,
            name: rows[0].name,
            email: rows[0].email,
            role: rows[0].role
        });
    } else {
        res.json({ error: 'Usuario o contraseña incorrectos'});
    }
}
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

export const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql,values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export const executeQuery = async (sql, values) => {
    try{
        const rows = await query(sql, values);
        return rows;
    }catch(error){
        console.log(error);
        return { error: error.message};
    }
};

import mysql from 'mysql2/promise';



export async function query ({query, values = []}) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try{
        const [results] = await connection.execute(query, values);
        connection.end();
        return results;
    }catch(error){
        console.log(error.message)
        return {error: error.message};
    }
};


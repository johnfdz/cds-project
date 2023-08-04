import { query } from "@/utils/db";

export default async function handler(req, res){
    if(req.method === 'GET'){
        const usuarios = await query({
            query: 'SELECT id, username, role FROM users',
            values: []
        });
        res.status(200).json({usuarios: usuarios});
    }

    if(req.method === 'POST'){
        const {username, password} = req.body;
        console.log(username, password)
        const usuarios = await query({  
            query: 'SELECT id, username, role, name FROM users WHERE username = ? AND password = ?',
            values: [username, password]
        });

        const result = usuarios.length === 1 ? {message: 'success', usuario: usuarios} : {message: 'error'}; 
        res.status(200).json(result);      
    }
}
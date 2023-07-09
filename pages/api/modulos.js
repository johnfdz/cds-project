import { query } from '@/utils/db';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const modulos = await query({
            query: 'SELECT * FROM modulo',
            values: []
        });
        res.status(200).json({modulos: modulos});
    }
}
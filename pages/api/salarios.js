import { query } from '@/utils/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const salarios = await query({
            query: 'SELECT doc.cedula, doc.nombre, cont.nombre as contrato, cont.sueldo FROM docente doc inner join tipo_contrato cont on cont.id = doc.contrato_id;',
            values: []
        });
        res.status(200).json({ salarios: salarios });
    }
}

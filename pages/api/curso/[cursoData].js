import { query } from '@/utils/db';

export default async function handler(req, res) {
    const { cursoData } = req.query;
    const { type } = req.body;

    if(req.method === 'POST') {
        const cursos = await query({
            query: 'call get_curso_data(?,?)',
            values: [cursoData, type]
        });

        res.status(200).json({cursos: cursos});
    }
}

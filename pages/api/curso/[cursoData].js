import { query } from '@/utils/db';

export default async function handler(req, res) {
    const { cursoData } = req.query;
    console.log(cursoData)
    const { id_usuario } = JSON.parse(cursoData);

    if(req.method === 'GET') {
        const cursos = await query({
            query: 'SELECT id_curso, materia_id, estudiante_id, docente_id FROM curso WHERE estudiante_id = ?',
            values: [cursoData]
        });
        res.status(200).json({cursos: cursos});
    }
}

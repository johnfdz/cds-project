import { query } from '@/utils/db';

export default async function handler(req, res) {
    const { cursoData } = req.query;
    console.log(cursoData)
    const { id_usuario } = JSON.parse(cursoData);

    if(req.method === 'GET') {
        const cursos = await query({
            query: 'SELECT materia.nombre as nombre, materia.modulo_id as modulo FROM curso inner join users on curso.estudiante_id = users.id inner join materia on curso.materia_id = materia.id_materias WHERE users.id = ?',
            values: [cursoData]
        });
        res.status(200).json({cursos: cursos});
    }
}

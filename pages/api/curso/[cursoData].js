import { query } from '@/utils/db';

export default async function handler(req, res) {
    const { cursoData } = req.query;

    if(req.method === 'GET') {
        const cursos = await query({
            query: 'SELECT materia.nombre as materia, materia.modulo_id as modulo, doc.nombre as docente FROM curso inner join estudiante est on curso.estudiante_id = est.id inner join materia on curso.materia_id = materia.id_materias'
            +' inner join docente doc on curso.docente_id = doc.id'
            +' WHERE est.id = ?',
            values: [cursoData]
        });

        res.status(200).json({cursos: cursos});
    }
}

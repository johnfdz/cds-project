import { query } from '@/utils/db';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const { id_usuario } = req.body;
        const cursos = await query({
            query: 'SELECT materia.nombre as nombre, materia.modulo_id as modulo FROM curso WHERE id_usuario = ? inner join users on curso.id_usuario = users.id inner join materia on curso.materia_id = materia.id_materias',
            values: [id_usuario]
        });
        console.log(cursos)
        res.status(200).json({cursos: cursos});
    }
    if(req.method === 'DELETE'){
        const { id } = req.body;
        const cursos = await query({
            query: 'DELETE FROM curso WHERE id = ?',
            values: [id]
        });
        const result = cursos.affectedRows === 1 ? { message: 'Curso eliminado' } : { message: 'Error al eliminar el curso' };
        res.status(200).json({response: {cursos: cursos, message: result.message}});
    }
    if(req.method === 'POST'){
        const { id_usuario } = req.body;
        const cursos = await query({
            query: 'SELECT * FROM curso WHERE id_usuario = ?',
            values: [id_usuario]
        });
        const result = cursos.affectedRows === 1 ? { message: 'Curso creado' } : { message: 'Error al crear el curso' };
        res.status(200).json({response: {cursos: cursos, message: result.message}});
    }
    if(req.method === 'PUT'){
        const { curso } = req.body;
        const cursos = await query({
            query: 'UPDATE curso SET nombre = ?, descripcion = ?, id_usuario = ? WHERE id = ?',
            values: [curso.nombre, curso.descripcion, curso.id_usuario, curso.id]
        });
        const result = cursos.affectedRows === 1 ? { message: 'Curso actualizado' } : { message: 'Error al actualizar el curso' };
        res.status(200).json({response: {cursos: cursos, message: result.message}});
    }
}

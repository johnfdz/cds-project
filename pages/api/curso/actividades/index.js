import { query } from '@/utils/db';

export default async function handler(req, res) {
    const { type } = req.body;
    if(req.method === 'POST' && type === 'GET') {
        const { curso_id } = req.body;
        const actividades = await query({
            query: 'call actividades_curso(?)',
            values: [curso_id]
        });
        res.status(200).json({actividades: actividades});
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
    if(req.method === 'POST' && type === 'POST'){
        const { titulo, descripcion, curso_id } = req.body;
        const cursos = await query({
            query: 'call post_actividad(?,?,?)',
            values: [titulo, descripcion, curso_id]
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
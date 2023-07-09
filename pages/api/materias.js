import { query } from '@/utils/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const modulos = await query({
            query: 'SELECT * FROM materia',
            values: []
        });
        res.status(200).json({materias: modulos});
    }

    if (req.method === 'POST') {
        const { nombre, modulo_id } = req.body;
        const modulos = await query({
            query: 'INSERT INTO materia (nombre, modulo_id) VALUES (?, ?)',
            values: [nombre, modulo_id]
        });
        const result = modulos.affectedRows === 1 ? { message: 'Materia creada' } : { message: 'Error al crear la materia' };
        res.status(200).json({response: {materias: modulos, message: result.message}});
    }

    if (req.method === 'PUT') {
        const { id_materias, nombre, precio } = req.body;
        const modulos = await query({
            query: 'UPDATE materia SET nombre = ?, precio = ? WHERE id_materias = ?',
            values: [nombre, precio, id_materias]
        });
        const result = modulos.affectedRows === 1 ? { message: 'Materia modificada' } : { message: 'Error al modificar la materia' };
        res.status(200).json({response: {materias: modulos, message: result.message}});
    }

    if (req.method === 'DELETE') {
        const { id_materias } = req.body;
        const modulos = await query({
            query: 'DELETE FROM materia WHERE id_materias = ?',
            values: [id_materias]
        });
        const result = modulos.affectedRows === 1 ? { message: 'Materia eliminada' } : { message: 'Error al eliminar la materia' };
        res.status(200).json({response: {materias: modulos, message: result.message}});
    }

}
import { query } from '@/utils/db';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const docentes = await query({
            query: 'SELECT cedula, nombre, apellido FROM docente',
            values: []
        });
        res.status(200).json({docentes: docentes});
    }
    if(req.method === 'DELETE'){
        const { id } = req.body;
        const docentes = await query({
            query: 'DELETE FROM docente WHERE id = ?',
            values: [id]
        });
        const result = docentes.affectedRows === 1 ? { message: 'Docente eliminado' } : { message: 'Error al eliminar el docente' };
        res.status(200).json({response: {docentes: docentes, message: result.message}});
    }
    if(req.method === 'POST'){
        const { cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio } = req.body;
        console.log(cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio)
        const docentes = await query({
            query: 'INSERT INTO docente (cedula, nombre, apellido, edad, direccion, correo, telefono, nivel_educacion, promedio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: [cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio]
        });
        const result = docentes.affectedRows === 1 ? { message: 'Docente creado' } : { message: 'Error al crear el docente' };
        res.status(200).json({response: {docentes: docentes, message: result.message}});
    }
    if(req.method === 'PUT'){
        const { docente } = req.body;
        const docentes = await query({
            query: 'UPDATE docente SET nombre = ?, apellido = ?, edad = ? WHERE id = ?',
            values: [docente.nombre, docente.apellido, docente.edad, docente.id]
        });
        const result = docentes.affectedRows === 1 ? { message: 'Docente actualizado' } : { message: 'Error al actualizar el docente' };
        res.status(200).json({response: {docentes: docentes, message: result.message}});
    }
}
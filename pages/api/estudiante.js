import { query } from '@/utils/db';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const estudiantes = await query({
            query: 'SELECT cedula, nombre, apellido FROM estudiante',
            values: []
        });
        res.status(200).json({estudiantes: estudiantes});
    }
    if(req.method === 'DELETE'){
        const { id } = req.body;
        const estudiantes = await query({
            query: 'DELETE FROM estudiante WHERE id = ?',
            values: [id]
        });
        const result = estudiantes.affectedRows === 1 ? { message: 'Estudiante eliminado' } : { message: 'Error al eliminar el estudiante' };
        res.status(200).json({response: {estudiantes: estudiantes, message: result.message}});
    }
    if(req.method === 'POST'){
        const { cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio } = req.body;
        console.log(cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio)
        const estudiantes = await query({
            query: 'INSERT INTO estudiante (cedula, nombre, apellido, edad, direccion, correo, telefono, nivel_educacion, promedio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: [cedula, nombre, apellido, edad, direccion,email,telefono,nivelEducacion, promedio]
        });
        const result = estudiantes.affectedRows === 1 ? { message: 'Estudiante creado' } : { message: 'Error al crear el estudiante' };
        res.status(200).json({response: {estudiantes: estudiantes, message: result.message}});
    }
    if(req.method === 'PUT'){
        const { estudiante } = req.body;
        const estudiantes = await query({
            query: 'UPDATE estudiante SET nombre = ?, apellido = ?, edad = ? WHERE id = ?',
            values: [estudiante.nombre, estudiante.apellido, estudiante.edad, estudiante.id]
        });
        const result = estudiantes.affectedRows === 1 ? { message: 'Estudiante actualizado' } : { message: 'Error al actualizar el estudiante' };
        res.status(200).json({response: {estudiantes: estudiantes, message: result.message}});
    }
}
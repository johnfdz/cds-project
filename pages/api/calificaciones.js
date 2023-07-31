import { query } from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const calificaciones = await query({
            query: "SELECT cal.id_calificacion, concat(est.nombre, ' ', est.apellido) as nombre_est, concat(doc.nombre, ' ',doc.apellido) as nombre_doc , mat.nombre, cal.calificacion" + 
            " FROM calificaciones cal" +
            " inner join estudiante est on est.id = cal.estudiante_id" +
            " inner join docente doc on doc.id = cal.profesor_id" +
            " inner join materia mat on mat.id_materias = cal.materia_id;",
            values: [],
        });
        res.status(200).json({ calificaciones: calificaciones });
    }
}
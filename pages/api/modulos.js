import { executeQuery } from '@/utils/db';

export default async function handler(req, res) {
    
    try {
        const fetchData = async () => {
            try {
                const results = await executeQuery('SELECT id_materias, nombre, modulo_id FROM materia');
                return { success: true, data: results };
            } catch (error) {
                return { success: false, error: error.message };
            }
        };

        const data = await fetchData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


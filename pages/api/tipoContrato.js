import { query } from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const tipoContrato = await query({
            query: "SELECT id, nombre FROM tipo_contrato",
            values: [],
        });
        res.status(200).json({ tipoContrato: tipoContrato });
    }
}
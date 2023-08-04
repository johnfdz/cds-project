import TablaCalificaciones from "@/components/tablas/TablaCalificaciones"
import { useState } from 'react'


export default function calificaciones({ calificaciones, materias }) {

    const [data, setData] = useState(calificaciones);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedFilter, setSelectedFilter] = useState('todos'); // Valor inicial del select
    const [sortKey, setSortKey] = useState('calificacion'); // Valor inicial del select

    const handleFilter = (filterValue) => {
        // Filtrar los datos según el criterio elegido por el usuario
        const filtered = calificaciones.filter((item) => item.nombre_est.includes(filterValue));
        setFilteredData(filtered);
    };

    const handleSelectFilter = (selectedValue) => {
        if (selectedValue === 'todos') {
            setFilteredData(data); // Mostrar todos los datos si se selecciona "todos"
        } else {
            const filtered = data.filter((item) => item.nombre === selectedValue);
            setFilteredData(filtered);
        }
    };

    const handleSort = () => {
        // Ordenar los datos según la clave seleccionada (sortKey)
        const sorted = [...filteredData].sort((a, b) => a[sortKey] - b[sortKey]);
        setFilteredData(sorted);
    };

    return (
        <>
            <main>
                <div className="container">
                    <h1>Calificaciones</h1>
                    <div class="row g-3 py-3">
                        <div class="col">
                            <input type="text" class="form-control" onChange={(e) => handleFilter(e.target.value)}
                                placeholder="Filtrar por estudiante" aria-label="First name" />
                        </div>
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingSelect">Materias</label>
                            <select class="form-select" value={selectedFilter} onChange={(e) => { setSelectedFilter(e.target.value); handleSelectFilter(e.target.value) }}
                                id="autoSizingSelect">
                                <option value={"todos"} selected>Todos</option>
                                {
                                    materias.map((materia) => (
                                        <option key={materia.id_materias} value={materia.nombre}>{materia.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div class="col">
                            <button type="button" onClick={handleSort} class="btn btn-primary">Ordenar por calificacion</button>
                        </div>
                    </div>
                    <TablaCalificaciones calificaciones={filteredData} />
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetch('http://localhost:3000/api/calificaciones')
    const mat = await fetch('http://localhost:3000/api/materias')
    const calificaciones = await data.json()
    const materias = await mat.json()


    return {
        props: {
            calificaciones: calificaciones.calificaciones,
            materias: materias.materias
        }
    }
}

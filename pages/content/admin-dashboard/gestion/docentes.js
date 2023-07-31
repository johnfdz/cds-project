

export default function Docentes() {
    //#region variables
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoContrato, setTipoContrato] = useState('');

    //#endregion

    return (
        <div className="container">
            <h1>Docentes</h1>
        </div>
    )
}
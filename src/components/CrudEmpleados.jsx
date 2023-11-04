import { useEffect } from "react";
import { useState } from "react"
import { Modal } from "react-bootstrap";

function CrudEmpleados() {
    const [listApi, setlistApi] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false)


    const [idItem, setidItem] = useState([])
    const [nameItem, setnameItem] = useState([])
    const [apellidoItem, setapellidoItem] = useState([])
    const [telefonoItem, settelefonoItem] = useState([])
    const [correoItem, setcorreoItem] = useState([])
    const [dniItem, setdniItem] = useState([])
    const [passItem, setpassItem] = useState([])

    const [updateId, setupdateId] = useState([])
    const [updateName, setupdateName] = useState([])
    const [updateApellido, setupdateApellido] = useState([])
    const [updateTelefono, setupdateTelefono] = useState([])
    const [updateCorreo, setupdateCorreo] = useState([])
    const [updateDni, setupdateDni] = useState([])


    const getListApi = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/mostrar", requestOptions)
            if (response.status >= 400) return alert("No se pudieron obtener los datos de la Api")
            const result = await response.json()
            setlistApi(result.data)
        } catch (error) {
            console.error(error);
        }
    }
    const nuevoItem = async () => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                name: nameItem,
                apellido: apellidoItem,
                telefono: telefonoItem,
                correo: correoItem,
                dni: dniItem,
                pass: passItem
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/register", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear nuevo elemento")
            setnameItem("")
            setapellidoItem("")
            settelefonoItem("")
            setcorreoItem("")
            setdniItem("")
            setpassItem("")

            getListApi();
        } catch (error) {
            console.error(error);
        }
    }
    const updateItem = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                name: updateName,
                apellido: updateApellido,
                telefono: updateTelefono,
                correo: updateCorreo,
                dni: updateDni
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/actualizar/6535ab8095c90bd682eb9f0a", requestOptions)
            if (!response.ok) throw new Error("no se pudo actualizar el elemento")
            await getListApi()
        } catch (error) {
            console.error(error);
        }

    }
    const handleSubmit = async () => {
        await nuevoItem()
    }
    const handleUpdate = async (_id) => {
        await updateItem(_id)
    }
    useEffect(() => {
        getListApi()
    }, [])

    return (
        <>
            <form className="bg-success">
                <h1>
                    Agregar Nuevo
                </h1>
                <div className="">
                    <label>Nombre</label>
                    <input type="text" placeholder="Your name" value={nameItem} onChange={(e) => {
                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                        setnameItem(onlyLettersAndSpaces);
                    }} />
                </div>
                <div className="">
                    <label>Apellido</label>
                    <input type="text" placeholder="Your Apellido" value={apellidoItem} onChange={(e) => {
                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                        setapellidoItem(onlyLettersAndSpaces);

                    }} />
                </div>
                <div className="">
                    <label>Phonenumber</label>
                    <input type="tel" placeholder="Your phonenumber" value={telefonoItem} onChange={(e) => {
                        const input = e.target.value;
                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                        settelefonoItem(onlyNumbers);
                    }} />
                </div>
                <div className="">
                    <label>Correo</label>
                    <input type="email" placeholder="correo@example.com" value={correoItem} onChange={(e) => setcorreoItem(e.target.value)} />
                </div>
                <div className="">
                    <label>Dni</label>
                    <input type="tel" placeholder="Your DNI" value={dniItem} onChange={(e) => {
                        const input = e.target.value
                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                        setdniItem(onlyNumbers);
                    }} />
                </div>
                <div className="">
                    <label>Password</label>
                    <input type="password" placeholder="Your password" value={passItem} onChange={(e) => setpassItem(e.target.value)} maxLength={20}
                        minLength={9} />
                </div>
                <button className="bg-danger" onClick={handleSubmit}
                    disabled={
                        !nameItem ||
                        !apellidoItem ||
                        !telefonoItem ||
                        !correoItem ||
                        !dniItem ||
                        !passItem
                    }>Agregar</button>
            </form>

            <table className="bg-warning">
                <thead>
                    <tr>
                        <th className="">Nombre</th>
                        <th className="">Apellido</th>
                        <th className="">Telefono</th>
                        <th className="">Correo</th>
                        <th className="">N° DNI</th>
                        <th className="">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listApi.map((item) => (
                            <tr key={item._id}>
                                <td data-titulo="Nombre">{item.name}</td>
                                <td data-titulo="Apellido">{item.apellido}</td>
                                <td data-titulo="Telefono">{item.telefono}</td>
                                <td data-titulo="correo">{item.correo}</td>
                                <td data-titulo="N° DNI">{item.dni}</td>
                                <td data-titulo="Opciones">
                                    <button><i className="bi bi-pencil-square">Eliminar</i></button>
                                    <button
                                        onClick={() => {
                                            setShowUpdateModal(true);
                                            setupdateId(item._id)
                                            setupdateName(item.name)
                                            setupdateApellido(item.apellido)
                                            setupdateTelefono(item.telefono)
                                            setupdateCorreo(item.correo)
                                            setupdateDni(item.dni)
                                        }}
                                    ><i className="bi bi-pencil-square">Update</i></button>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            <Modal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">
                        Actualizar Datos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="bg-success">
                        <h1>
                            Actualizar
                        </h1>
                        <div className="">
                            <label>Nombre</label>
                            <input type="text" placeholder="Your name" value={updateName} onChange={(e) => {
                                const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                setupdateName(onlyLettersAndSpaces);
                            }} />
                        </div>
                        <div className="">
                            <label>Apellido</label>
                            <input type="text" placeholder="Your Apellido" value={updateApellido} onChange={(e) => {
                                const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                setupdateApellido(onlyLettersAndSpaces);

                            }} />
                        </div>
                        <div className="">
                            <label>Phonenumber</label>
                            <input type="tel" placeholder="Your phonenumber" value={updateTelefono} onChange={(e) => {
                                const input = e.target.value;
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                setupdateTelefono(onlyNumbers);
                            }} />
                        </div>
                        <div className="">
                            <label>Correo</label>
                            <input type="email" placeholder="correo@example.com" value={updateCorreo} onChange={(e) => setupdateCorreo(e.target.value)} />
                        </div>
                        <div className="">
                            <label>Dni</label>
                            <input type="tel" placeholder="Your DNI" value={updateDni} onChange={(e) => {
                                const input = e.target.value
                                const onlyNumbers = input.replace(/[^0-9]/g, "");
                                setupdateDni(onlyNumbers);
                            }} />
                        </div>
                        <button className="bg-danger" onClick={handleUpdate}
                            disabled={
                                !updateName ||
                                !updateApellido ||
                                !updateTelefono ||
                                !updateCorreo ||
                                !updateDni
                            }>Agregar</button>
                    </form>
                    
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CrudEmpleados
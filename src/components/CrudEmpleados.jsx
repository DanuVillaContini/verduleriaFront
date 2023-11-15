import { useEffect } from "react";
import { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudEmpleados.module.css"


function CrudEmpleados() {
    const mostrarItem = [
        { _id: 1, name: "Rogelio Bermudes", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 2, name: "Sandra Raco", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 3, name: "Carlos Peremulter", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 4, name: "Sabrina Perez", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 5, name: "Octavio Ponce", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 6, name: "Silvina Escupidero", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 7, name: "Roberta Rojo", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 8, name: "Ellen Sanchez", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 },
        { _id: 9, name: "Sasha Costa", apellido: "Costa", telefono: 381222333,correo:"example@example.com", dni: 11222333 }
    ]

    // const [listApi, setlistApi] = useState([])
    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

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

    const [deleteId, setDeleteId] = useState("");

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
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                name: nameItem,
                apellido: apellidoItem,
                telefono: telefonoItem,
                correo: correoItem,
                dni: dniItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/register", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el elemento")

            setnameItem("")
            setapellidoItem("")
            settelefonoItem("")
            setcorreoItem("")
            setdniItem("")

            await getListApi()
        } catch (error) {
            console.error(error);
        }
    }
    const updateItem = async () => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                name: updateName,
                apellido: updateApellido,
                telefono: updateTelefono,
                correo: updateCorreo,
                dni: updateDni
            });

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/actualizar/" + updateId, requestOptions)
            if (!response.ok) throw new Error("no se pudo actualizar el elemento")
            setShowSuccessModal(true);
            setShowUpdateModal(false)
            await getListApi()
        } catch (error) {
            console.error(error);
        }
    }
    const deleteItem = async (_id) => {
        try {

            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch("https://estetica-backend-5ltx.onrender.com/usuario/eliminar/" + _id, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el personal")
            setDeleteId("");
            setShowSuccessModal(true);
            setShowDeleteModal(false);
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
    const handleDeletePersonal = async (_id) => {
        setDeleteId(_id);
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async () => {
        await deleteItem(deleteId);
    }

    useEffect(() => {
        getListApi()
    }, [])

    return (
        <>
            <Container >
                <Row className="d-flex flex-row flex-column m-1">
                    <Col>
                        <h1>Empleados</h1>
                        <Button
                            variant="info"
                            onClick={() => {
                                setshowNuevoPedidoForm((prevState) => !prevState);
                            }}
                        >Nuevo</Button>
                        <form className={`bg-secondary ${Styles["nuevoItem__empleados-form"]}`} style={{ height: showNuevoPedidoForm ? "auto" : undefined }}>
                            <h1>
                                Agregar Nuevo
                            </h1>
                            <div className="">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={nameItem}
                                    onChange={(e) => {
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
                    </Col>
                </Row>

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
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    maxLength={25}
                                    value={updateName} onChange={(e) => {
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
                            <button onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updateName ||
                                    !updateApellido ||
                                    !updateTelefono ||
                                    !updateCorreo ||
                                    !updateDni
                                }>Actualizar</button>
                        </form>
                    </Modal.Body>
                </Modal>

                <Row>
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
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td data-titulo="Nombre">{item.name}</td>
                                        <td data-titulo="Apellido">{item.apellido}</td>
                                        <td data-titulo="Telefono">{item.telefono}</td>
                                        <td data-titulo="correo">{item.correo}</td>
                                        <td data-titulo="N° DNI">{item.dni}</td>
                                        <td data-titulo="Opciones">
                                            <button onClick={() => {
                                                handleDeletePersonal(item._id);
                                            }}>
                                                <i className="bi bi-trash"></i> 
                                            </button>

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
                                            ><i className="bi bi-pencil-square"></i></button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Row>
                
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Confirmar eliminación
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-monospace ">
                        ¿Estás seguro de que deseas eliminar este elemento?
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        <button
                            onClick={handleConfirmDelete}>Si</button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showSuccessModal}
                    onHide={() => setShowSuccessModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">
                            Operación exitosa
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="font-monospace ">
                        La operación se ha realizado exitosamente.
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                        >Ok</button>
                    </Modal.Footer>
                </Modal>

            </Container>


        </>
    )
}

export default CrudEmpleados

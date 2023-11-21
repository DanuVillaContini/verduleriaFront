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
            <div className={Styles['div-de-empleados']}>
            <Container>
                <Row className="d-flex flex-row flex-column m-1">
                    <Col className={Styles['col-de-empleados']}>
                    
                        <h2>Empleados</h2>
                    
                        <button className={Styles['button-de-empleados']}
                            variant="info"
                            onClick={() => {
                                setshowNuevoPedidoForm((prevState) => !prevState);
                            }}
                        ><i className="bi bi-plus-circle-fill"> </i>Nuevo Empleado</button>
                        <form className={`bg-secondary ${Styles["nuevoItem__empleados-form"]}`} style={{ display: showNuevoPedidoForm ? "flex" : "none", height: showNuevoPedidoForm ? "auto" : "10px" }}>
                            <h4 className={Styles['texto-de-nuevo-pedido']}>
                                Agregar Nuevo
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={nameItem}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={apellidoItem} className={Styles['input-form']} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setapellidoItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Phonenumber</label>
                                <input type="tel" placeholder="Your phonenumber" value={telefonoItem} className={Styles['input-form']} onChange={(e) => {
                                    const input = e.target.value;
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    settelefonoItem(onlyNumbers);
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Correo</label>
                                <input type="email" placeholder="correo@example.com" value={correoItem} className={Styles['input-form']} onChange={(e) => setcorreoItem(e.target.value)} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Dni</label>
                                <input type="tel" placeholder="Your DNI" value={dniItem} className={Styles['input-form']} onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setdniItem(onlyNumbers);
                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Password</label>
                                <input type="password" placeholder="Your password" value={passItem} className={Styles['input-form']} onChange={(e) => setpassItem(e.target.value)} maxLength={20}
                                    minLength={9} />
                            </div>
                            <Button className={`m-5 ${Styles["button-de-empleados"]}`}
                                disabled={
                                    !nameItem ||
                                    !apellidoItem ||
                                    !telefonoItem ||
                                    !correoItem ||
                                    !dniItem ||
                                    !passItem
                                }>Agregar</Button>
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
                            <Button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updateName ||
                                    !updateApellido ||
                                    !updateTelefono ||
                                    !updateCorreo ||
                                    !updateDni
                                }>Actualizar</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <Row>
                    <table className={`bg-warning ${Styles["tabla-de-acreedores"]}`}>
                        <thead>
                            <tr>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Apellido</th>
                                <th className="text-center">Telefono</th>
                                <th className="text-center">Correo</th>
                                <th className="text-center">N° DNI</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mostrarItem.map((item) => (
                                    <tr key={item._id}>
                                        <td className="text-center" data-titulo="Nombre">{item.name}</td>
                                        <td className="text-center" data-titulo="Apellido">{item.apellido}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.telefono}</td>
                                        <td className="text-center" data-titulo="correo">{item.correo}</td>
                                        <td className="text-center" data-titulo="N° DNI">{item.dni}</td>
                                        <td className="text-center" data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1" onClick={() => {
                                                handleDeletePersonal(item._id);
                                            }}>
                                                <i className="bi bi-trash"></i> 
                                            </Button>

                                            <Button variant='outline-success' className="m-1"
                                                onClick={() => {
                                                    setShowUpdateModal(true);
                                                    setupdateId(item._id)
                                                    setupdateName(item.name)
                                                    setupdateApellido(item.apellido)
                                                    setupdateTelefono(item.telefono)
                                                    setupdateCorreo(item.correo)
                                                    setupdateDni(item.dni)
                                                }}
                                            ><i className="bi bi-pencil-square"></i></Button>

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
            </div>


        </>
    )
}

export default CrudEmpleados

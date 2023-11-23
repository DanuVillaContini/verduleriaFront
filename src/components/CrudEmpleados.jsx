import { useEffect } from "react";
import { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudEmpleados.module.css"
import { API_URI } from "../common/constantes"


function CrudEmpleados() {
    const [allData, setAllData] = useState([])

    const [showNuevoPedidoForm, setshowNuevoPedidoForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [nameItem, setnameItem] = useState([])
    const [apellidoItem, setapellidoItem] = useState([])
    const [telefonoItem, settelefonoItem] = useState([])
    const [correoItem, setcorreoItem] = useState([])


    const [updateId, setupdateId] = useState("");
    const [updateName, setupdateName] = useState([])
    const [updateApellido, setupdateApellido] = useState([])
    const [updateTelefono, setupdateTelefono] = useState([])
    const [updateCorreo, setupdateCorreo] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        try {
            console.log("Fetching data from API...");
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/api/getEmpleados", requestOptions);
            if (!response.ok) {
                console.error("Error fetching data:", response.statusText);
                return;
            }

            const result = await response.json();

            if (Array.isArray(result)) {
                console.log("Data received:", result);
                setAllData(result);
            } else {
                console.error("Error: Unexpected response format - expected an array", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
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
                correo: correoItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/api/createEmpleados", requestOptions);
            if (!response.ok) throw new Error("no se pudo crear el Empleado");

            setnameItem("");
            setapellidoItem("");
            settelefonoItem("");
            setcorreoItem("");
            setshowNuevoPedidoForm(true);
            setShowSuccessModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    }

    const updateItem = async () => {
        try {
            if (!updateId) {
                console.error("ID de empleado no definido");
                return;
            }
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updateName,
                    apellido: updateApellido,
                    telefono: updateTelefono,
                    correo: updateCorreo,
                }),
                redirect: "follow",
            };

            const response = await fetch(
                API_URI + "/api/updateEmpleados/" + updateId,
                requestOptions
            );
            if (!response.ok) throw new Error("No se pudo actualizar el empleado");

            setShowSuccessModal(true);
            setShowUpdateModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteItem = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/api/deleteEmpleados/" + deleteId, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el empleado")
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
    const handleUpdate = async () => {
        await updateItem();
    };
    const handleDeletePersonal = async (id) => {
        setDeleteId(id);
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
                                // variant="info"
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
                                <button className={`m-5 ${Styles["button-de-empleados"]}`}
                                    onClick={handleSubmit}
                                    disabled={
                                        !nameItem ||
                                        !apellidoItem ||
                                        !telefonoItem ||
                                        !correoItem
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
                            <form>
                                <h1>
                                    Actualizar
                                </h1>
                                <div className="m-1">
                                    <label className="mx-2">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        maxLength={25}
                                        value={updateName} onChange={(e) => {
                                            const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                            setupdateName(onlyLettersAndSpaces);
                                        }} />
                                </div>
                                <div className="m-1">
                                    <label className="mx-2">Apellido</label>
                                    <input type="text" placeholder="Your Apellido" value={updateApellido} onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdateApellido(onlyLettersAndSpaces);

                                    }} />
                                </div>
                                <div className="m-1">
                                    <label className="mx-2">Phonenumber</label>
                                    <input type="tel" placeholder="Your phonenumber" value={updateTelefono} onChange={(e) => {
                                        const input = e.target.value;
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setupdateTelefono(onlyNumbers);
                                    }} />
                                </div>
                                <div className="m-1">
                                    <label className="mx-2">Correo</label>
                                    <input type="email" placeholder="correo@example.com" value={updateCorreo} onChange={(e) => setupdateCorreo(e.target.value)} />
                                </div>
                                <button className={`my-1 mx-4 ${Styles["button-de-empleados"]}`} onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                                <button className={`my-1 mx-4 ${Styles["button-de-empleados"]}`} onClick={handleUpdate}
                                    disabled={
                                        !updateName ||
                                        !updateApellido ||
                                        !updateTelefono ||
                                        !updateCorreo
                                    }>Actualizar</button>
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
                                    <th className="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allData?.map((empleado) => (
                                        <tr key={empleado.id}>
                                            <td className="text-center" data-titulo="Nombre">{empleado.name}</td>
                                            <td className="text-center" data-titulo="Apellido">{empleado.apellido}</td>
                                            <td className="text-center" data-titulo="Telefono">{empleado.telefono}</td>
                                            <td className="text-center" data-titulo="correo">{empleado.correo}</td>
                                            <td className="text-center" data-titulo="Opciones">
                                                <Button variant='outline-danger' className="m-1" onClick={() =>
                                                    handleDeletePersonal(empleado.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                                <Button
                                                    variant='outline-success'
                                                    className="m-1"
                                                    onClick={() => {

                                                        setShowUpdateModal(true);
                                                        setupdateId(empleado.id);
                                                        setupdateName(empleado.name);
                                                        setupdateApellido(empleado.apellido);
                                                        setupdateTelefono(empleado.telefono);
                                                        setupdateCorreo(empleado.correo);
                                                    }}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>

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

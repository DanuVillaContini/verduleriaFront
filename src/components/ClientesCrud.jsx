import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Styles from "../styles/crudVentas.module.css"
import { useEffect, useState } from "react";
import { API_URI } from "../common/constantes";

function ClientesCrud() {
    const [allData, setAllData] = useState([])
    const [showNuevoProveeForm, setshowNuevoProveeForm] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const [nameItem, setnameItem] = useState([])
    const [celularItem, setcelularItem] = useState([])
    const [direccionItem, setdireccionItem] = useState([])
    // const [productItem, setproductItem] = useState([])

    const [updateId, setupdateId] = useState([])
    const [updatnameItem, setupdatnameItem] = useState([])
    const [updatecelularItem, setupdatecelularItem] = useState([])
    const [updateDirecc, setupdateDirecc] = useState([])
    // const [updateproductItem, setupdateproductItem] = useState([])

    const [deleteId, setDeleteId] = useState("");

    const getListApi = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/clientes/get", requestOptions)
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
                name_apellido: nameItem,
                telefono: celularItem,
                direccion: direccionItem
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/clientes/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el Empleado");
            setnameItem("")
            setcelularItem("")
            setdireccionItem("")
            setshowNuevoProveeForm(true);
            setShowSuccessModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    }
    const updateItem = async () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                name_apellido: updatnameItem,
                telefono: updatecelularItem,
                direccion: updateDirecc
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(
                API_URI + "/clientes/update/" + updateId, requestOptions)
            if (!response.ok) throw new Error("No se pudo actualizar el empleado");

            setShowSuccessModal(true);
            setShowUpdateModal(false);
            await getListApi();
        } catch (error) {
            console.error(error);
        }
    }
    const deleteItem = async () => {
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/clientes/delete/"+ deleteId, requestOptions)
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
        await updateItem()
    }
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
        <div className={Styles['div-de-proveedores']}>
            <Container>
                {/* FORM Y BUTTON PARA CREAR NUEVO ITEM */}
                <Row className="d-flex flex-row flex-column m-1">
                    <Col className={Styles['col-de-proveedores']}>
                        <h2>Clientes</h2>
                        <button className={Styles['button-de-proveedores']}
                            // variant="info"
                            onClick={() => {
                                setshowNuevoProveeForm((prevState) => !prevState);
                            }}
                        > <i className="bi bi-plus-circle-fill"></i>  Agregar nuevo proveedor</button>
                        <form className={`bg-secondary ${Styles["nuevoItem__provee-form"]}`} style={{ display: showNuevoProveeForm ? "flex" : "none", height: showNuevoProveeForm ? "auto" : "10px" }}>
                            <h4>
                                Agregar Nuevo
                            </h4>
                            <div className={Styles['container-div-del-form']}>
                                <label>Nombre y Apellido del Cliente</label>
                                <input
                                    type="text"
                                    placeholder="Nombre y Apellido del Cliente"
                                    value={nameItem}
                                    className={Styles['input-form']}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setnameItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Telefono</label>
                                <input type="text" placeholder="Telefono" value={celularItem} className={Styles['input-form']} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setcelularItem(onlyLettersAndSpaces);

                                }} />
                            </div>
                            <div className={Styles['container-div-del-form']}>
                                <label>Direccion</label>
                                <input type="email" placeholder="Direccion" value={direccionItem} className={Styles['input-form']} onChange={(e) => setdireccionItem(e.target.value)} />
                            </div>
                            <button className={Styles['button-de-proveedores']} onClick={handleSubmit}
                                disabled={
                                    !nameItem ||
                                    !celularItem ||
                                    !direccionItem
                                }>Agregar</button>
                        </form>
                    </Col>
                </Row>

                {/* FORM PARA ACTUALIZAR MODAL  */}
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
                                    value={updatnameItem} onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdatnameItem(onlyLettersAndSpaces);
                                    }} />
                            </div>
                            <div className="">
                                <label>Apellido</label>
                                <input type="text" placeholder="Your Apellido" value={updatecelularItem} onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setupdatecelularItem(onlyLettersAndSpaces);
                                }} />
                            </div>
                            <div className="">
                                <label>Direccion</label>
                                <input type="text" placeholder="Direccion" value={updateDirecc} onChange={(e) => setupdateDirecc(e.target.value)} />
                            </div>
                            <button onClick={() => { setShowUpdateModal(false) }}>Cancelar</button>
                            <button className="bg-danger" onClick={handleUpdate}
                                disabled={
                                    !updatnameItem ||
                                    !updatecelularItem ||
                                    !updateDirecc
                                }>Actualizar</button>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* TABLA QUE RENDERIZA LO QUE TRAE DEL BACK  */}

                <div className={`bg-warning ${Styles["contenedor-de-proveedores"]}`}>
                    <table className={`bg-warning ${Styles["tabla-de-proveedores"]}`}>
                        <thead>
                            <tr>
                                <th className="text-center">Nombre y Apellido</th>
                                <th className="text-center">Telefono</th>
                                <th className="text-center">Correo</th>
                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData?.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center" data-titulo="Nombre">{item.name_apellido}</td>
                                        <td className="text-center" data-titulo="Telefono">{item.telefono}</td>
                                        <td className="text-center" data-titulo="correo">{item.direccion}</td>
                                        <td className="text-center" data-titulo="Opciones">
                                            <Button variant='outline-danger' className="m-1" onClick={() => {
                                                handleDeletePersonal(item.id);
                                            }}>
                                                <i className="bi bi-trash-fill" ></i>
                                            </Button>
                                            <Button variant='outline-success' className="m-1" onClick={() => {
                                                setShowUpdateModal(true);
                                                setupdateId(item.id)
                                                setupdatnameItem(item.name_apellido)
                                                setupdatecelularItem(item.telefono)
                                                setupdateDirecc(item.direccion)
                                            }}>
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* MODAL PARA ELIMINAR ITEM DE LA TABLA  */}
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

                {/* MODAL GENERICO PARA CONFIRMA ACCION  */}
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
    )
}

export default ClientesCrud
